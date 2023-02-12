import React from "react";

import { TranslationProvider } from "@translation/components/TranslationContext";
import HomePage from "@core/pages/HomePage";

import "./App.scss";

const App: React.FunctionComponent = () => (
	<TranslationProvider>
		<HomePage />
	</TranslationProvider>
);

export default App;
