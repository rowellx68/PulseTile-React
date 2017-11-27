import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';

import ProtectedRoute from './ProtectedRoute';
import Breadcrumbs from '../Breadcumbs/Breadcrumbs';
import { sidebarAndUserSelector, mainSelector, initialiseSelector } from './selectors';
import { PatientsLists, SystemDashboard, PatientsFullDetailsSearch, UserProfile, PatientsSummary } from '../../pages';
import { clientUrls } from '../../../config/client-urls.constants';
import { routersPluginConfig } from '../../../plugins.config';
import { redirectAccordingRole } from '../../../utils/redirect-helpers.utils'
import { setSidebarVisibility } from '../../../ducks/set-sidebar-visibility';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ setSidebarVisibility }, dispatch) });

@withRouter
@connect(sidebarAndUserSelector, mapDispatchToProps)
@connect(mainSelector)
@connect(initialiseSelector)
export default class Main extends PureComponent {
    static propTypes = {
      isSidebarVisible: PropTypes.bool.isRequired,
    };

    componentWillReceiveProps(nextProps) {
      const { actions } = this.props;
      if (!_.isEmpty(nextProps.userAccount)) {
        this.props.history.listen(() => {
          redirectAccordingRole(nextProps.userAccount);
          if (window.innerWidth < 768) {
            actions.setSidebarVisibility(false);
          }
        })
      }
    }

    render() {
      const { isSidebarVisible, userAccount, patientSummeriesParams, initialiseData } = this.props;
      const patientSummeries = _.head(_.values(patientSummeriesParams));
      return (
        <main className={classNames('main', { showSidebar: isSidebarVisible })}>
          <Breadcrumbs
            userAccount={userAccount}
            patientSummeries={patientSummeries}
          />
          {!_.isEmpty(initialiseData) ? <Switch>
            <Route exact path={clientUrls.USER_PROFILE} component={UserProfile} />
            <Route exact path={`${clientUrls.PATIENTS}/:userId/${clientUrls.PATIENTS_SUMMARY}`} component={PatientsSummary} />
            <ProtectedRoute exact path={clientUrls.PATIENTS} component={PatientsLists} userAccount={userAccount} />
            <ProtectedRoute exact path={clientUrls.PATIENTS_FULL_DETAILS} component={PatientsFullDetailsSearch} userAccount={userAccount} />
            <ProtectedRoute exact path={clientUrls.CHARTS} component={SystemDashboard} userAccount={userAccount} />
            <ProtectedRoute exact path={clientUrls.ROOT} component={SystemDashboard} userAccount={userAccount} />
            {routersPluginConfig.map(item => <Route exact path={item.path} component={item.component} />)}
          </Switch> : null }
        </main>
      )
    }
}
