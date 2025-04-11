import FacebookIcon from "../assets/icons/facebook.svg"
import InstagramIcon from "../assets/icons/instagram.svg"
import MailIcon from "../assets/icons/mail.svg"

export default function MetaBottom() {
  return (
    <div className="meta-section">
      <div className="meta-section-content">
        <div className="meta-section-element">
          <p>© Shape Up Fitness Stęszew 2025</p>
        </div>
        <div className="meta-section-element">
          <a
            href="https://www.facebook.com/profile.php?id=100078911106815&locale=pl_PL"
            target="_blank"
          >
            <img src={FacebookIcon} alt="facebook icon" />
          </a>
          <a href="https://www.instagram.com/shapeupfitness_steszew/" target="_blank">
            <img src={InstagramIcon} alt="instagram icon" />
          </a>
          <a href="#">
            <img src={MailIcon} alt="mail icon" />
          </a>
        </div>
      </div>
    </div>
  )
}
