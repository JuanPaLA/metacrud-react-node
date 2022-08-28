import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div id="header" className='box'>
        <Link to={'/'}><h3>Metacrud home</h3></Link>
    </div>
  )
}