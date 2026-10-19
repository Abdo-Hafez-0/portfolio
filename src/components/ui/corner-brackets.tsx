const CORNERS = [
  "top-2.5 left-2.5 border-t border-l",
  "top-2.5 right-2.5 border-t border-r",
  "bottom-2.5 left-2.5 border-b border-l",
  "bottom-2.5 right-2.5 border-b border-r",
];

/** Viewfinder-style corner marks. The parent must be `relative`. */
export function CornerBrackets() {
  return (
    <>
      {CORNERS.map((position) => (
        <span key={position} aria-hidden="true" className={`corner ${position}`} />
      ))}
    </>
  );
}
