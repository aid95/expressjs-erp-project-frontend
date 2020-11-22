const BOX_BORDER = "1px solid #e6e6e6";
const BORDER_RADIUS = "4px";

const Theme = {
  contentMaxWidth: "1280px",
  footerMaxWidth: "1060px",
  bgColor: "#FAFAFA",
  blackColor: "#444",
  darkGreyColor: "#777",
  greenColor: "#32aa46",
  lightGreyColor: "#c7c7c7",
  redColor: "#ED4956",
  blueColor: "#3897f0",
  darkBlueColor: "#003569",
  boxBorder: "1px solid #e6e6e6",
  borderRadius: "4px",
  whiteBox: `border:${BOX_BORDER};
             border-radius:${BORDER_RADIUS};
             background-color:white;
            `,
  modalStyles: {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  },
};

export default Theme;
