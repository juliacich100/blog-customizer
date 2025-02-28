import { CSSProperties } from 'react';

import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { useState } from 'react';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleResetSettings = () => {
		setArticleState(defaultArticleState);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm initialState={articleState} onApply={setArticleState} onReset={handleResetSettings}/>
			<Article />
		</main>
	);
};