import { Header } from "codexterity";

// Fixed top navigation bar. The bar itself is bg-transparent (it darkens on
// scroll), so the preview supplies the dark page background it sits over.
// cardMode:single contains the fixed positioning inside the card.
export const Default = () => (
  <div style={{ background: "#000", minHeight: 200 }}>
    <Header />
  </div>
);
