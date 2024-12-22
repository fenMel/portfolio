import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

export default function Footer() {
    return <>
        <footer className="footer">
            <div className="footersec flex flex-center flex-col gap-2">
                <div className="logo">
                    <img src="/img/logo.png" alt="" />
                </div>
                <ul className="flex gap-2">
                    <li><Link href='/documents'>Attestation & Rapport</Link></li>
                    <li><Link href='/Projects'>Projects</Link></li>
                    <li><Link href='/blogs'>Veille technologique </Link></li>
                    <li><Link href='/Contact'>Contact</Link></li>
                </ul>
                <ul className="hero_social">
                  <li><a target="_blank" href="https://fr.linkedin.com/in/fenzi-melissa-b41275290"><GrLinkedinOption /></a></li>
                  <li><a target="_blank" href="https://github.com/melfe28"><FaGithub /></a></li>
                </ul>
                <div className="copyrights">&copy; 2024 All Rights Reserved By <span>FenziMelissa</span></div>
            </div>
        </footer>
    </>
}