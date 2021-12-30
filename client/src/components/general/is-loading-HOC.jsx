/* Method that checks whether a props is empty 
prop can be an object, string or an array */

/**
 * Info taken from:
 *   https://blog.bitsrc.io/building-a-universal-higher-order-component-page-loader-for-your-react-app-46d74f7a6958
 * 
 * Usage:
 *   For example in Panel.jsx 
 *        const { setLoading } = props;
 *        ...
 *        useEffect(() => {
 *          setLoading(true);
 *        }, []);
 * 
 *        const mothod = async asyncMethod => {
 *          setLoading(true);
 *          await service.method();
 *          setLoading(false);
 *        }
 * 
 *        const generateReport = async reportData => {
 *          setLoading(true);
 *          await reportService.generateReport(reportData);
 *          setLoading(false);
 *        }
 *        ...
 *        return (
 *          <div>
 *            <ReportGenerator generateReport={generateReport} ></ReportGenerator>
 *          </div>
 *        );
 *        ...
 *        export default IsLoadingHOC()(Panel, 'test');
 * 
 */

import { useState } from 'react';
import './loading-gif.css';

const IsLoadingHOC = (props) => (WrappedComponent, loadingMessage) => {
  return function HOC(props) {
    const [isLoading, setLoading] = useState(true);

    const setLoadingState = isComponentLoading => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && <div className="loading" ></div>}
        <WrappedComponent {...props} setLoading={setLoadingState} ></WrappedComponent>
      </>
    );
  };
};

export default IsLoadingHOC;
