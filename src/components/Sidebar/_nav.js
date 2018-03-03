export default {
  items: [
    {
      title: true,
      name: "Helstonbury",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Home Page",
      url: "/homepage",
      icon: "icon-home"
    },
    {
      name: "Dates",
      url: "/dates",
      icon: "icon-calendar"
    },
    {
      name: "Bands",
      url: "/bands",
      icon: "icon-microphone"
    },
    {
      name: "Schedule",
      url: "/schedule",
      icon: "icon-calendar"
    },
    {
      name: "Stages",
      url: "/stages",
      icon: "icon-anchor"
    }
  ]
};
