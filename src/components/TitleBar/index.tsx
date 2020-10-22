import React, { FunctionComponentElement, useCallback } from 'react';
import { composeInferTypeMemo } from 'utils/composeInferType';
import { burgerMenu, burgerMenuOpened, cloud } from 'assets/images';

import styles from './styles.module.scss';

export interface ITitleBarProps {
    isSiderBarOpened?: boolean;
    onBurgerMenuClick?: () => void;
}

function TitleBar({ isSiderBarOpened, onBurgerMenuClick }: ITitleBarProps): FunctionComponentElement<ITitleBarProps> {
    const onBurgerMenuClickLocal = useCallback(() => {
        if (onBurgerMenuClick) {
            onBurgerMenuClick();
        }
    }, [onBurgerMenuClick]);
    return (
        <div className={[styles['title-bar'], styles[isSiderBarOpened ? 'menu-opened' : 'menu-closed']].join(' ')}>
            <img
                className={styles['title-menu']}
                src={isSiderBarOpened ? burgerMenuOpened : burgerMenu}
                alt=""
                onClick={onBurgerMenuClickLocal}
            />
            <div className={styles['title-content']}>
                <img className={styles['title-icon']} src={cloud} alt="" />
                <p className={styles['title-text']}>Weather App</p>
            </div>
        </div>
    );
}
export default composeInferTypeMemo(TitleBar)();
