/* ASCYST content. Edit only this file.
   To add a business or brand: copy one block, paste it after the last one, change the values. */
window.SITE = {
  name: "ASCYST",
  placeholder: "More businesses will appear here as they launch.",

  businesses: [
    {
      name: "Absolute Cooked",
      description: "A social media brand that shares cooking content.",
      url: "cooked",                             // relative path or full URL; "" = non-clickable card
      image: "img/absolute-cooked.png",
      imagePosition: "50% 38%",                  // CSS object-position: crop of the square artwork
      category: "Social Media",
      status: "Currently focused",
      live: true                                 // true = accent colour + pulsing dot
    }
  ],

  brands: [
    {
      name: "Greenpa \uD83C\uDF40",
      description: "A brand under Ascyst.",
      url: "",                                   // no link yet = non-clickable card
      status: "Brand"
    }
  ],

  contact: [
    { label: "Instagram", value: "@arion.core", url: "https://instagram.com/arion.core" },
    { label: "Email", value: "arionpax.connect@gmail.com", url: "mailto:arionpax.connect@gmail.com" }
  ]
};
