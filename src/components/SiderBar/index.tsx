import React, { FunctionComponentElement, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { composeInferTypeMemo } from 'utils/composeInferType';
import styles from './styles.module.scss';

export interface ISiderBarProps {
    isShow?: boolean;
    onMenuItemClick?: () => void;
}

function SiderBar({ isShow, onMenuItemClick }: ISiderBarProps): FunctionComponentElement<ISiderBarProps> {
    const onMenuItemClickLocal = useCallback(() => {
        if (onMenuItemClick) {
            onMenuItemClick();
        }
    }, [onMenuItemClick]);
    return (
        <div className={[styles['sider-bar'], styles[isShow ? 'show' : 'hide']].join(' ')}>
            <h3 className={styles['title-text']}>Weather</h3>
            <div className={styles['sider-bar__list-item']}>
                <Link onClick={onMenuItemClickLocal} to="/" className={styles['item-detail']}>
                    Home
                </Link>
                <Link onClick={onMenuItemClickLocal} to="/week" className={styles['item-detail']}>
                    Week
                </Link>
            </div>
            <div className={styles['sider-bar__footer']}>
                <p>@NNT - 2020</p>
            </div>
        </div>
    );
}
export default composeInferTypeMemo(SiderBar)();
