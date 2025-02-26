import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {RadioGroup} from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { ArticleStateType, fontFamilyOptions, OptionType, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { useState, useEffect, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	initialState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({ initialState, onApply, onReset }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};
	
	const rootRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const [selectedFont, setSelectedFont] = useState<OptionType>(initialState.fontFamilyOption);
	const handleSelectChange = (option: OptionType) => {
		setSelectedFont(option);
	};

	const [isSelectOpen, setSelectOpen] = useState(false);
	const handleCloseSelect = () => {
		setSelectOpen(false);
	};

	const [selectedRadio, setRadio] = useState<OptionType>(initialState.fontSizeOption);
	const handleRadioChange = (option: OptionType) => {
		setRadio(option);
	};

	const [selectedFontColor, setFontColor] = useState<OptionType>(initialState.fontColor);
	const handleFontColor = (option: OptionType) => {
		setFontColor(option);
	};

	const [selectedBgrColor, setBgrColor] = useState<OptionType>(initialState.backgroundColor);
	const handleBgrColor = (option: OptionType) => {
		setBgrColor(option);
	};

	const [selectedWidth, setWidth] = useState<OptionType>(initialState.contentWidth);
	const handleWidth = (option: OptionType) => {
		setWidth(option);
	};

	useEffect(() => {
		setSelectedFont(initialState.fontFamilyOption);
		setRadio(initialState.fontSizeOption);
		setFontColor(initialState.fontColor);
		setBgrColor(initialState.backgroundColor);
		setWidth(initialState.contentWidth);
	}, [initialState]);

	const handleApply = (event: React.MouseEvent) => {
		event.preventDefault();
		const newState = {
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedRadio,
			fontColor: selectedFontColor,
			backgroundColor: selectedBgrColor,
			contentWidth: selectedWidth,
		};
		onApply(newState);
	};

	const handleReset = () => {
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar}/>
			<aside ref={rootRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase={true} align="left" family='open-sans'>
						Параметры статьи
					</Text>
					<Select selected={selectedFont} options={fontFamilyOptions} title='шрифт' onChange={handleSelectChange} onClose={handleCloseSelect}/>
					<RadioGroup name="fontSize" options={fontSizeOptions} selected={selectedRadio} onChange={handleRadioChange}  title="Размер шрифта"/>
					<Select selected={selectedFontColor} options={fontColors} title='Цвет шрифта' onChange={handleFontColor} onClose={handleCloseSelect}/>
					<Separator/>
					<Select selected={selectedBgrColor} options={backgroundColors} title='Цвет фона' onChange={handleBgrColor} onClose={handleCloseSelect}/>
					<Select selected={selectedWidth} options={contentWidthArr} title='Ширина контента' onChange={handleWidth} onClose={handleCloseSelect}/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={handleReset}/>
						<Button title='Применить' htmlType='submit' type='apply' onClick={handleApply} />
					</div>
				</form>
			</aside>
		</>
	);
};
