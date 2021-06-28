/* eslint-disable */
import { Link as RouterLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import {
  Button,
  Link,
} from '@material-ui/core';
import { AppContext } from '../Context';

const ProductList = () => {
  const {
    products,
    ProductLength,
    editMode,
    cancelEdit,
    updateProduct,
    deleteProduct,
  } = useContext(AppContext);
  // Storing users new data when they editing their info.
  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateProduct(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (prodid, prodname, prodprice, prodcost) => {
    setNewData({
      prodid, prodname, prodprice, prodcost
    });
    editMode(prodid);
  };

  const deleteConfirm = (prodid) => {
    if (window.confirm('Are you sure?')) {
      deleteProduct(prodid);
    }
  };
  return !ProductLength ? (
    <p>{ProductLength === null ? 'Loading...' : 'Please insert some users.'}</p>
  ) : (
    <table>
      <thead>
        <tr>
          <Link
            color="primary"
            component={RouterLink}
            to="/app/insertproduct"
            variant="h6"
          >             
            <Button
              className="btn default-btn"
            >
              新增
            </Button>
          </Link>
        </tr>
        <tr>
          <th>產品名稱</th>
          <th>價格</th>
          <th>成本</th>
          <th>動作</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({
          prodid, prodname, prodprice, prodcost, isEditing
        }) => {
          return isEditing === true ? (
            <tr key={prodid}>
              <td>
                <input
                  type="text"
                  defaultValue={prodname}
                  onChange={(e) => updateNewData(e, 'prodname')}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={prodprice}
                  onChange={(e) => updateNewData(e, 'prodprice')}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={prodcost}
                  onChange={(e) => updateNewData(e, 'prodcost')}
                />
              </td>
              <td>
                <button className="btn green-btn" onClick={() => saveBtn()}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => cancelEdit(prodid)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={prodid}>
              <td>{prodname}</td>
              <td>{prodprice}</td>
              <td>{prodcost}</td>
              <td>
                <button
                  className="btn default-btn"
                  onClick={() => enableEdit(prodid, prodname, prodprice, prodcost)}
                >
                  Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => deleteConfirm(prodid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductList;
