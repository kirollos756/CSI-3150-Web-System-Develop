import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    /* Reset box model and margin */
	html, body {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

    /* Set font and positioning */
	body {
		position: relative;
		top: 300px;
		font-family: 'Nunito Sans', sans-serif;
	}

    /* Additional global styles and responsive adjustments here */
`;
