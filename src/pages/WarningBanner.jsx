import React from "react";

const WarningBanner = () => {
  return (
    <div style={styles.container}>
      ⚠️ This is a student project and is not affiliated with Coinbase.
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#ffcc00",
    color: "#000",
    textAlign: "center",
    padding: "10px",
    fontWeight: "bold",
    fontSize: "14px",
  },
};

export default WarningBanner;