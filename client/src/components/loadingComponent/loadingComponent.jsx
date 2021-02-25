import React from 'react';
import { LoaderProvider, useLoading, Oval } from '@agney/react-loading';
import './loadingComponent.scss'

const LoadingComponent = (props) => {
  const { containerProps, indicatorEl } = useLoading({
		loading: !props.isLoaded
	});
  return <section className="load_component_block" {...containerProps}>{indicatorEl}</section>;
}

export default LoadingComponent;
