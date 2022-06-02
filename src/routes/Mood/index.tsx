import { FormEvent } from 'react'
import { useRecoilValue } from 'recoil'

import { useState } from 'hooks'
import { mainMoodItem, subMoodItem } from 'states'

import MainMood from './MainMood'
import SubMood from './SubMood'
import Modal from 'routes/_components/Modal/ModalFrame'
import { Love } from 'assets/svgs'
import styles from './mood.module.scss'

const Mood = () => {
  const [subMoodKey, setSubMoodKey] = useState<string>()
  const getMainMood = useRecoilValue(mainMoodItem)
  const getSubMood = useRecoilValue(subMoodItem)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  const onItemChange = (value: string) => setSubMoodKey(value)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    !(getMainMood && getSubMood) ? setIsVerified(true) : setIsVerified(false)
  }

  const onClose = () => setIsVerified(false)

  return (
    <section className={styles.moodContainer}>
      <h2>
        당신의 기분과 분위기를 선택해주세요
        <Love />
      </h2>
      <form onSubmit={handleSubmit} className={styles.cateContainer}>
        <MainMood onItemChange={onItemChange} />
        {subMoodKey && <SubMood moodKey={subMoodKey} />}
        <button type='submit' className={styles.moodSubmit}>
          MOOD PLAY
        </button>
      </form>
      <Modal isOpen={isVerified} onClose={onClose} width='400px' height='250px' text='알림창'>
        <p className={styles.modalText}>두개의 카테고리 모두 선택해주세요!</p>
      </Modal>
    </section>
  )
}
export default Mood
