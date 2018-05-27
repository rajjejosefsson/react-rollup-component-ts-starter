import './TabPanel.scss';

import * as React from 'react';

const TabPanelContext = React.createContext({});

export class TabPanel extends React.Component<any> {
  static Content = ({ children }) => (
    <TabPanelContext.Consumer>{() => children}</TabPanelContext.Consumer>
  );

  static TabBar = ({ children, ...props }) => (
    <TabPanelContext.Consumer>
      {() => (
        <div className="tabBar" {...props}>
          {children}
        </div>
      )}
    </TabPanelContext.Consumer>
  );

  /* <TabPanel.Tab tabIndex={1} >{children}</TabPanel.Tab> */
  static Tab = ({ children, tabIndex }) => (
    <TabPanelContext.Consumer>
      {({ onInternalTabChange, internalActiveTab }: any) => (
        <div
          onClick={() => onInternalTabChange(tabIndex)}
          className={`tab ${tabIndex === internalActiveTab ? 'active' : ''}`}
        >
          {children}
        </div>
      )}
    </TabPanelContext.Consumer>
  );

  internalTabChange = (index) => {
    this.setState(
      { internalActiveTab: index },
      this.props.onChangeTab && this.props.onChangeTab(index), // Get current tab index
    );
  };

  state = {
    internalActiveTab: this.props.activeTabIndex || 1,
    onInternalTabChange: this.internalTabChange,
  };

  render() {
    return (
      <TabPanelContext.Provider value={this.state}>
        {this.props.children}
      </TabPanelContext.Provider>
    );
  }
}
