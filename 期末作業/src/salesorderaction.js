/* eslint-disable */
import { useEffect, useState } from "react";

export const salesorderaction = () => {
  let [salesorders, setSalesorder] = useState([]);

    //userLength is for showing the Data Loading message.
  let [SalesorderLength, setSalesorderLength] = useState(null);

  useEffect(() => {
    fetch("http://localhost/php-react/all-salesorder.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
            setSalesorder(data.salesorders);
            setSalesorderLength(true);
        } else {
            setSalesorderLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Inserting a new user into the database.
  const insertSalesorder = (newsalesorder) => {
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

  // Enabling the edit mode for a listed user.
  const editMode = (seq) => {
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

  // Cance the edit mode.
  const cancelEdit = (seq) => {
    salesorders = salesorders.map((salesorder) => {
      if (salesorder.seq === seq) {
        salesorder.isEditing = false;
        return salesorder;
      }
      return salesorder;
    });
    setSalesorder(salesorders);
  };

  // Updating a user.
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

  // Deleting a user.
  const deleteSalesorder = (theID) => {
      // filter outing the user.
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

  return {
    salesorders,
    editMode,
    cancelEdit,
    updateSalesorder,
    insertSalesorder,
    deleteSalesorder,
    SalesorderLength,
  };
};