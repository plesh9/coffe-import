import { useState } from "react";
import { animated, useSpring, config, useSpringRef, useChain } from "react-spring";

function Checkbox({ label='label', name, register, isChecked, setIsChecked}) {
  const [checkmarkLength, setCheckmarkLength] = useState(null);
  const checkboxAnimationRef = useSpringRef();
  const checkmarkAnimationRef = useSpringRef();

  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "#60c403" : "#fff",
    borderColor: isChecked ? "#60c403" : "#e9e9e9",
    config: config.gentle,
    ref: checkboxAnimationRef,
  });

  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });

  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1] // -> delay by 0.1 seconds
  );

  return (
    <label className={`checkbox ${isChecked ? "checkbox--active" : ""}`}>
      <input
      {...register(name, {
        required: true,
        onChange: () => setIsChecked(!isChecked),
        checked: isChecked
        })} 
        type="checkbox"
      />
      <animated.svg
        style={checkboxAnimationStyle}
        className={'checkbox__icon'}
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          ref={(ref) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
        />
      </animated.svg>
      {label}
    </label>
  );
}

export default Checkbox;
