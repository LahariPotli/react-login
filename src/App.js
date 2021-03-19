
import './App.css';
import Recipe from './Recipe';
import React, { useState, useEffect } from 'react';
import Title from 'antd/lib/typography/Title';
import { Avatar } from 'antd';


import { Layout } from 'antd';
import { Breadcrumb } from 'antd';
import { Collapse } from 'antd';
import { Drawer, Button } from 'antd';
import { Modal } from 'antd';

const { Panel } = Collapse;

const { Header, Footer, Content } = Layout;






function App() {
  const APP_ID = "1617ec1e";
  const APP_KEY = "cdf75bfd64aefbc9b8e33f9b07982938	";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);

  };


  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };



  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <>
      <div className="App">
        <Layout>

          <Header style={{ padding: 10 }}>
            <Avatar style={{ float: 'right' }} src="./image.png" />
            <Title style={{ color: 'white' }} level={3}>LahariReddy</Title>

          </Header>
          <Layout>
            <Title style={{ color: 'black', textAlign: 'center' }} level={2}>WELCOME</Title>
            <Title style={{ color: 'black', textAlign: 'center' }} level={3}>PLEASE SEARCH FOR THE ITEM</Title>
            <form style={{ padding: 10 }} onSubmit={getSearch} className="search-form" >
              <input className="search-bar" type="text" value={search} onChange={updateSearch} />
              <button className="search-button" type="submit" >
                search
            </button >
            </form>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Recipes</Breadcrumb.Item>

              </Breadcrumb>
              <Collapse defaultActiveKey={['1']} >
                <Panel header="Please collapse the panel for your searched recipes" key="1">
                  <p>
                    <div style={{ background: "#fff", padding: 24, minHeight: 500 }}>
                      <div className="recipes">
                        <Button type="primary" onClick={showDrawer}>
                          Open
                </Button>
                        <Drawer
                          title="List of searched recipes"
                          placement="right"
                          closable={false}
                          onClose={onClose}
                          visible={visible}
                        >
                          <Button type="primary" onClick={showModal}>
                            Click here
                          </Button>  
                          <Modal title="List of searched recipes" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       
                          {recipes && recipes.map(recipe => (

                            <Recipe
                              key={recipe.recipe.label}
                              title={recipe.recipe.label}
                              calories={recipe.recipe.calories}
                              image={recipe.recipe.image}
                              ingredients={recipe.recipe.ingredients}

                            />

                          ))}
                          </Modal>

                        </Drawer>
                      </div>

                    </div>
                  </p>
                </Panel>
              </Collapse>
            </Content>


            <Footer style={{ textAlign: 'center' }}>Ant Design Created by LahariReddy</Footer>
          </Layout>


        </Layout>
      </div>
    </>
  );

};

export default App;
