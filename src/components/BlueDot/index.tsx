function BlueDot({id, classname}: {id: string, classname: string}) {
  return (
    <svg
      id={id}
      className={classname}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_2)">
        <path
          d="M7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14Z"
          fill="white"
          stroke="#DBDBDB"
          strokeWidth="2"
        />
        <g clipPath="url(#clip1_1_2)">
          <path
            d="M7.5 11C9.433 11 11 9.433 11 7.5C11 5.567 9.433 4 7.5 4C5.567 4 4 5.567 4 7.5C4 9.433 5.567 11 7.5 11Z"
            fill="#66A3FF"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width="15" height="15" fill="white" />
        </clipPath>
        <clipPath id="clip1_1_2">
          <rect width="7" height="7" fill="white" transform="translate(4 4)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default BlueDot