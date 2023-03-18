import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	*{
		box-sizing: border-box;
	}
	input, button, p, textarea {
		font-family: 'Lexend Deca', sans-serif;
	}
`

export default GlobalStyle