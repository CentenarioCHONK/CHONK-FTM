import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  min-width: 35px;
  position: relative;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  font-size: 14px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  
  ::placeholder {
    color: white;
  }
`

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export default function Input({ value, onUserInput }) {
    function enforcer (nextUserInput) {
      if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
        onUserInput(nextUserInput)
      }
    }

    return (
      <StyledInput
        value={value}
        onChange={(event) => {
          // replace commas with periods, because we exclusively uses period as the decimal separator
          enforcer(event.target.value.replace(/,/g, '.'));
        }}
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={'0.0'}
        minLength={1}
        maxLength={79}
        spellCheck="false"
      />
    );
};