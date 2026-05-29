import styles from "../style_modules/component_modules/NavBar.module.css"
export default function navBar(prop) {
  const { setIsMenuBtnClicked } = prop
  return (
    <>
      <div className={`${styles.navbar}`}>
        <div className={`d-none d-sm-block ${styles.name_container}`}>
          <h2 className={`${styles.name}`}>Anvaya CRM</h2>
          <h5 className={`${styles.name_description}`}>
            Agent Performance Monitor
          </h5>
        </div>
        <button
          className={`${styles.menu_button}`}
          title="Menu"
          onClick={() => setIsMenuBtnClicked(true)}
        >
          <i className="bi bi-list"></i>
        </button>
        <div className={`${styles.nav_items}`}>
          {/* <button className={`${styles.nav_btn}`}>
            <i className={`bi bi-moon-fill ${styles.icon}`}></i>
          </button> */}
          {/* <button className={`${styles.nav_btn}`}>
            <i className={`bi bi-gear ${styles.icon}`}></i>
          </button> */}
          {/* <button className={`${styles.nav_btn}`}>
            <i className={`bi bi-person-fill ${styles.icon}`}></i>
          </button> */}
        </div>
      </div>
    </>
  )
}
