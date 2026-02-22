export function Footer() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
        {apiKey && (
          <div className="mx-auto mb-10 aspect-video w-full max-w-xl overflow-hidden rounded-lg">
            <iframe
              src={`https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=40.75867694573971,-73.97273506183731&heading=120&pitch=45&fov=80`}
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Street View of the Seagram Building at 375 Park Avenue"
            />
          </div>
        )}
        <p className="text-xs tracking-wider text-white/30 uppercase">
          An interactive architectural history
        </p>
      </div>
    </footer>
  );
}
