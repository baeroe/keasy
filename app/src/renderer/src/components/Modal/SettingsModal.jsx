import React from 'react'
import { useTranslation } from 'react-i18next'
import { changeLanguage } from '../../common/translations'
import Dropdown from '../DropDown'

export default function SettingsModal(props) {
  const { t } = useTranslation()
  const languages = [
    { text: t('english'), value: 'en' },
    { text: t('german'), value: 'de' }
  ]

  const { closeModal } = props

  const defaultOption =
    languages.find((lang) => lang.value == localStorage.getItem('lang')) || languages[0]

  const handleChangeLanguage = (e) => {
    localStorage.setItem('lang', e.value)
    changeLanguage(e.value)
    // closeModal()
  }
  return (
    <div>
      <div className="flex flex-col w-60">
        <label htmlFor="lang" className="text-gray-400 mb-1 text-sm">
          {t('language')}
        </label>
        <Dropdown options={languages} onChange={handleChangeLanguage} value={defaultOption} />
      </div>
    </div>
  )
}
