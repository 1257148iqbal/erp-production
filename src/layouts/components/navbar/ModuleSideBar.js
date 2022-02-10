// ** React Imports
// ** Custom Components
import Avatar from '@components/avatar';
import '@custom-styles/basic/app-slider.scss';
import { Fragment, useState } from 'react';
// ** Third Party Components
import { ArrowLeft, Box, DollarSign, GitPullRequest, Grid, TrendingUp, User } from 'react-feather';
import { Button, Card, CardHeader, CardText, Col, Label, Media } from 'reactstrap';
import CardBody from 'reactstrap/lib/CardBody';
import Row from 'reactstrap/lib/Row';

const data = [
  {
    title: 'Merchantizing',
    subtitle: 'Sales',
    color: 'light-primary',
    icon: <TrendingUp size={24} />,
    url: '/'
  },
  {
    title: 'Inventory',
    subtitle: 'Products',
    color: 'light-danger',
    icon: <Box size={24} />,
    url: '/'
  },
  {
    title: 'Productions',
    subtitle: 'Productions',
    color: 'light-primary',
    icon: <GitPullRequest size={24} />,
    url: '/'
  },
  {
    title: 'HR',
    subtitle: 'Customers',
    color: 'light-info',
    icon: <User size={24} />,
    url: '/'
  },
  {
    title: 'Accounts',
    subtitle: 'Revenue',
    color: 'light-success',
    icon: <DollarSign size={24} />,
    url: '/'
  }
];
const ModuleSideBar = () => {
  // ** State
  const [moduleSidebarOpen, setModuleSidebarOpen] = useState(false);

  // ** Function to toggle Dropdown
  const toggleAppSidebar = () => setModuleSidebarOpen(prevState => !prevState);

  return (
    <>
      <Grid
        className="ficon"
        onClick={() => {
          toggleAppSidebar();
        }}
      />
      {moduleSidebarOpen && (
        <div className="app-slider-main">
          <div className="app-slider">
            <Card>
              <CardHeader className="d-flex ">
                <CardText className="text-dark font-weight-bold h5">Apps</CardText>
                <Button.Ripple
                  tag={Label}
                  for="appCloseId"
                  className="btn-icon"
                  color="flat-danger"
                  onClick={() => {
                    toggleAppSidebar();
                  }}
                >
                  <ArrowLeft id="appCloseId" size={20} />
                </Button.Ripple>
              </CardHeader>
              <CardBody>
                <Media>
                  <Media body>
                    <Row className="d-flex justify-content-center">
                      {data?.map((i, inx) => (
                        <Fragment key={inx + 1}>
                          <Col xs={12} className="">
                            <Avatar
                              color={i.color}
                              icon={i.icon}
                              className="m-1 align-items-center"
                            />
                            <Label className="font-weight-bolder h5">{i.title}</Label>
                          </Col>
                        </Fragment>
                      ))}
                    </Row>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ModuleSideBar;
