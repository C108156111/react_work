/* eslint-disable */
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const prodaction = () => {
  //user
  let [employee, setEmployee] = useState([]);
  const navigate = useNavigate();
  const Account = (Emp) => {
    fetch("http://localhost/php-react/account.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Emp),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Success");
          setEmployee(data.employee[0]);
          navigate('/app/dashboard', { replace: true });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //product
  let [products, setProduct] = useState([]);
  let [ProductLength, setProductLength] = useState(null);

  useEffect(() => {
    fetch("http://localhost/php-react/all-product.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProduct(data.products);
          setProductLength(true);
        } else {
          setProductLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const insertproduct = (newproduct) => {
    fetch("http://localhost/php-react/add-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newproduct),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.prodid) {
          setProduct([
            {
              prodid: data.prodid,
              ...newproduct,
            },
            ...products,
          ]);
          setProductLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editMode = (prodid) => {
    products = products.map((product) => {
      if (product.prodid === prodid) {
        product.isEditing = true;
        return product;
      }
      product.isEditing = false;
      return product;
    });
    setProduct(products);
  };

  const cancelEdit = (prodid) => {
    products = products.map((product) => {
      if (product.prodid === prodid) {
        product.isEditing = false;
        return product;
      }
      return product;
    });
    setProduct(products);
  };

  const updateProduct = (prodData) => {
    fetch("http://localhost/php-react/update-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prodData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          products = products.map((product) => {
            if (product.prodid === prodData.prodid) {
              product.isEditing = false;
              product.prodname = prodData.prodname;
              product.prodprice = prodData.prodprice;
              product.prodcost = prodData.prodcost;
              return product;
            }
            return product;
          });
          setProduct(products);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (theID) => {
    let productDeleted = products.filter((product) => {
      return product.prodid !== theID;
    });
    fetch("http://localhost/php-react/delete-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prodid: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProduct(productDeleted);
          if (products.length === 1) {
            setProductLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
    //saleorder
    let [salesorders, setSalesorder] = useState([]);

    useEffect(() => {
      fetch("http://localhost/php-react/all-salesorder.php")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
            setSalesorder(data.salesorders);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const insertsalesorder = (newsalesorder) => {
      fetch("http://localhost/php-react/add-salesorder.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsalesorder),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.seq) {
            setSalesorder([
              {
                seq: data.seq,
                ...newsalesorder,
              },
              ...salesorders,
            ]);
            setSalesorderLength(true);
          } else {
            alert(data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const SeditMode = (seq) => {
      salesorders = salesorders.map((salesorder) => {
        if (salesorder.seq === seq) {
          salesorder.isEditing = true;
          return salesorder;
        }
        salesorder.isEditing = false;
        return salesorder;
      });
      setSalesorder(salesorders);
    };

    const ScancelEdit = (seq) => {
      salesorders = salesorders.map((salesorder) => {
        if (salesorder.seq === seq) {
          salesorder.isEditing = false;
          return salesorder;
        }
        return salesorder;
      });
      setSalesorder(salesorders);
    };

    const updateSalesorder = (salesData) => {
      fetch("http://localhost/php-react/update-salesorder.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesData),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            salesorders = salesorders.map((salesorder) => {
              if (salesorder.seq === salesData.seq) {
                salesorder.isEditing = false;
                salesorder.salesid = salesData.salesid;
                salesorder.empid = salesData.empid;
                salesorder.custid = salesData.custid;
                salesorder.orderdate = salesData.orderdate;
                salesorder.descript = salesData.descript;

                return salesorder;
              }
              return salesorder;
            });
            setSalesorder(salesorders);
          } else {
            alert(data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const deleteSalesorder = (theID) => {
      let salesorderDeleted = salesorders.filter((salesorder) => {
        return salesorder.seq !== theID;
      });
      fetch("http://localhost/php-react/delete-salesorder.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seq: theID }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setSalesorder(salesorderDeleted);
            if (salesorders.length === 1) {
              setSalesorderLength(0);
            }
          } else {
            alert(data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    let [orderdetail, setOrderdetail] = useState([]);

    const getOrderdetail = (TheOrder) => {
      fetch("http://localhost/php-react/orderdetail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OrderId: TheOrder }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          //data是回傳的資料
          if (data.success) {
            alert("Success");
            setOrderdetail(data.orderdetail);
          } else {
            setOrderdetail([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

  const insertOrderdetail = (newdetail) => {
    fetch("http://localhost/php-react/add-orderdetail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newdetail),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Success");
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OeditMode = (seq) => {
    orderdetail = orderdetail.map((orderdetail) => {
      if (orderdetail.seq === seq) {
        orderdetail.isEditing = true;
        return orderdetail;
      }
      orderdetail.isEditing = false;
      return orderdetail;
    });
    setOrderdetail(orderdetail);
  };

  const OcancelEdit = (seq) => {
    orderdetail = orderdetail.map((orderdetail) => {
      if (orderdetail.seq === seq) {
        orderdetail.isEditing = false;
        return orderdetail;
      }
      return orderdetail;
    });
    setOrderdetail(orderdetail);
  };

  const updateOrderdetail = (newdetail) => {
    fetch("http://localhost/php-react/update-orderdetail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newdetail),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Success");
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteOrderdetail = (theID) => {
    console.log(theID);
    fetch("http://localhost/php-react/delete-orderdetail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seq: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Success");
          getOrderdetail(orderdetail[0].OrderId);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let [report, setReport] = useState([]);

  useEffect(() => {
    fetch("http://localhost/php-react/report.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReport(data.report);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


    return {
      employee,
      Account,
      products,
      editMode,
      cancelEdit,
      updateProduct,
      insertproduct,
      deleteProduct,
      ProductLength,
      salesorders,
      SeditMode,
      ScancelEdit,
      updateSalesorder,
      insertsalesorder,
      deleteSalesorder,
      orderdetail,
      getOrderdetail,
      insertOrderdetail,
      updateOrderdetail,
      deleteOrderdetail,
      OeditMode,
      OcancelEdit,
      report,
    };
};