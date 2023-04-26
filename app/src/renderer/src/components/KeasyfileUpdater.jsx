import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSystemService } from '../services/systemService'

export default function KeasyfileUpdater() {
  const data = useSelector((state) => state.data)
  const options = useSelector((state) => state.options)
  const systemService = useSystemService()

  useEffect(() => {
    if (!options.triggerUpdate) {
      return
    }
    const asyncUseEffect = async () => {
      await systemService.writeKeasyFile(options.path, options.password, data)
    }

    asyncUseEffect()
  }, [data])

  return <div />
}
