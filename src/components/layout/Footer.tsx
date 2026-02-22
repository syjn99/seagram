export function Footer() {
  return (
    <footer className="bg-seagram-charcoal px-6 py-20 text-center">
      <div className="mx-auto max-w-2xl">
        <div className="bg-seagram-bronze/40 mx-auto mb-6 h-px w-16" />
        <h2 className="font-display mb-4 text-2xl font-bold text-white md:text-3xl">
          375 Park Avenue
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-white/50">
          The Seagram Building was designated a New York City landmark in 1989 and listed on the
          National Register of Historic Places in 2006. Designed by Ludwig Mies van der Rohe with
          Philip Johnson, completed 1958.
        </p>
        <p className="text-xs tracking-wider text-white/30 uppercase">
          An interactive architectural history
        </p>
      </div>
    </footer>
  );
}
