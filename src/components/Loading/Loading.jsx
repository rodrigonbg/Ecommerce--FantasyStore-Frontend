import React from 'react'
import 'bootstrap'
import './Loading.scss'

export const Loading = () => {
  return (
    <div className="text-center">
        <div className="spinner-border loading" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}
