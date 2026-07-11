// Persistent, fixed surface shared by every section: a faint grid faded at the
// edges plus fine film grain. Sections layer their own radial glows on top.
export default function Backdrop() {
  return (
    <>
      <div className="backdrop-grid" aria-hidden />
      <div className="backdrop-grain" aria-hidden />
    </>
  );
}
