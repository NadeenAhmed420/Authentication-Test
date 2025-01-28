import Image from "next/image";
import styles from "./SocialMedia.module.css";

function SocialMedia() {
  return (
    <div className="d-flex justify-content-between align-items-center gap-3">
      <a
        href="https://mail.google.com/mail/"
        type="button"
        className={styles.link}
      >
        <Image src="/google.svg" width={30} height={30} alt="google" className={styles.image} />
        Google
      </a>
      <a
        href="https://www.icloud.com/mail"
        type="button"
        className={styles.link}
      >
        <Image src="/apple.svg" width={30} height={30} alt="apple" className={styles.image} />
        Apple
      </a>
    </div>
  );
}

export default SocialMedia;
