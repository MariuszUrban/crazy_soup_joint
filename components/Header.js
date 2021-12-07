import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.css";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";

  const goBack = (event) => {
    event.preventDefault();
    router.back();
  };

  const { user } = useContext(AuthContext);

  return (
    <div className={styles.nav}>
      {!isHome && (
        <div className={styles.back}>
          <button
            style={{ background: "none", cursor: "pointer", border: "none" }}
            onClick={goBack}
          >
            {"<"}Back
          </button>
        </div>
      )}
      <div className={styles.title}>
        <Link href="/">
          <a>
            <h1 style={{ textAlign: "center" }}>The Crazy Soup Joint</h1>
          </a>
        </Link>
      </div>
      <div className={styles.auth}>
        {user ? (
          <Link href="/account">
            <a>
              <Image width={16} src="/profile.png" alt={user.email} />
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <img src="/profile.png" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
