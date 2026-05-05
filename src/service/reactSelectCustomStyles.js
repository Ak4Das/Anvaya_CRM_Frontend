  export const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      color: "#ffffff",
      border: "none",
      marginTop: "15px",
      marginBottom: "5px",
      paddingRight: "10px",
      width: "100%",
      boxShadow: "none",
      outline: "none",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#374151"
        : state.isSelected
          ? "#198754"
          : "#1f2a37",
      color: "#fff",
      cursor: "pointer",
    }),
    menuList: (provided) => ({
      ...provided,
      overflowY: "auto",
      scrollbarWidth: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#ffffff",
    }),
  }

  export const customStylesForReportPage = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "purple",
      color: "#ffffff",
      border: "none",
      marginTop: "15px",
      marginBottom: "5px",
      paddingRight: "10px",
      boxShadow: "none",
      outline: "none",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#374151"
        : state.isSelected
          ? "#198754"
          : "#1f2a37",
      color: "#fff",
      cursor: "pointer",
    }),
    menuList: (provided) => ({
      ...provided,
      overflowY: "auto",
      scrollbarWidth: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#ffffff",
    }),
  }