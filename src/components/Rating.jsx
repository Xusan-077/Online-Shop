function Rating({ rating = 0, bottom, nan }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starSize = bottom ? "w-6 h-6" : "w-5 h-5";

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className={`${starSize} text-yellow-500`}
        >
          <path d="M11.259 2.522c.245-.701 1.237-.701 1.482 0l2.102 6.009 6.386.129c.746.015 1.052.963.457 1.412l-5.087 3.832 1.851 6.08c.217.711-.586 1.297-1.197.874L12 17.225l-5.253 3.633c-.611.423-1.414-.163-1.197-.875l1.85-6.079-5.086-3.832c-.595-.449-.289-1.397.457-1.412l6.386-.13 2.102-6.008Z" />
        </svg>
      ))}

      {hasHalfStar && (
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`${starSize} text-yellow-500`}
        >
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="lightgray" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half-fill)"
            d="M11.259 2.522c.245-.701 1.237-.701 1.482 0l2.102 6.009 6.386.129c.746.015 1.052.963.457 1.412l-5.087 3.832 1.851 6.08c.217.711-.586 1.297-1.197.874L12 17.225l-5.253 3.633c-.611.423-1.414-.163-1.197-.875l1.85-6.079-5.086-3.832c-.595-.449-.289-1.397.457-1.412l6.386-.13 2.102-6.008Z"
          />
        </svg>
      )}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className={`${starSize} text-gray-300`}
        >
          <path d="M11.259 2.522c.245-.701 1.237-.701 1.482 0l2.102 6.009 6.386.129c.746.015 1.052.963.457 1.412l-5.087 3.832 1.851 6.08c.217.711-.586 1.297-1.197.874L12 17.225l-5.253 3.633c-.611.423-1.414-.163-1.197-.875l1.85-6.079-5.086-3.832c-.595-.449-.289-1.397.457-1.412l6.386-.13 2.102-6.008Z" />
        </svg>
      ))}

      <span className="text-yellow-500 ml-1">{nan ? "" : rating}</span>
    </div>
  );
}

export default Rating;
