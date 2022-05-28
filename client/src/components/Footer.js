import React from 'react'
import { FaGithub } from "react-icons/fa"

function Footer() {
  return (
    <>
    <footer>
    <span>
      Kristen Cadacio{" "}
      <a
        href="https://github.com/cadakris"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub className="footerIcon" />
      </a>{" "}
    </span>
  </footer>
</>
  )
}

export default Footer