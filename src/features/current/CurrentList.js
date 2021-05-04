import { Fragment } from "react";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { currentDeleted, currentSaved } from "./currentSlice";
import { categoryList } from "../../app/categoryList";
import deleteIcon from "../../icons/icon-delete.svg";
import creditcardIcon from "../../icons/icon-creditcard.svg";

// styles
import "./CurrentList.scss";

function CurrentList(props) {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentPayment, setcurrentPayment] = useState("all");
  const [sharedOnly, setsharedOnly] = useState(false);

  const categoryFilter = (items) => {
    if (currentCategory === "all") return items;
    return items.filter((item) => {
      return item.category === currentCategory;
    });
  };
  const paymentFilter = (items) => {
    if (currentPayment === "all") return items;
    return items.filter((item) => {
      return item.pay === currentPayment;
    });
  };

  const sharedFilter = (items) => {
    if (!sharedOnly) return items;
    return items.filter((item) => item.shared);
  }

  const list = sharedFilter(paymentFilter(categoryFilter(useSelector((state) => state.current))));

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setcurrentPayment(e.target.value);
  }

  const handleDelete = (id) => {
    dispatch(currentDeleted(id));
    dispatch(currentSaved());
  }

  const handleShared = (e) => {
    setsharedOnly(e.target.checked);
  }

  const items = list.map((item, index) => {
    const date = DateTime.fromFormat(item.date, "yyyy-MM-dd").toFormat("MM/dd");
    const category = categoryList.find(
      (category) => category.value === item.category
    );
    const creditIconElement = item.pay === 'credit' 
      ? <img className="budget-list__payment" src={creditcardIcon} alt="creditcard"></img>
      : '';
    return (
      <li className="budget-list__item" key={index}>
        <span className="budget-list__date">{date}</span>
        <span className="budget-list__price">
          ¥{parseInt(item.price).toLocaleString()}
        </span>
        <span className="budget-list__desc">{item.desc}</span>
        {creditIconElement}
        <span className={`budget-list__category ${item.category}`}>
          {category.name}
        </span>
        <span className="budget-list__delete" onClick={() => handleDelete(item.id)}>
          <img src={deleteIcon} alt="delete"></img>
        </span>
      </li>
    );
  });

  const priceSum = list.reduce((acc, val) => {
    return acc + parseInt(val.price);
  }, 0);

  const categoryOptions = categoryList.map((category) => {
    return (
      <option
        className="budget-category__option"
        value={category.value}
        key={category.value}
      >
        {category.name}
      </option>
    );
  });

  return (
    <Fragment>
      <div className="budget-list__header">
        <span className="price-sum">合計: ¥{priceSum.toLocaleString()}</span>
        <span className="shared-only">共同支出のみ<input type="checkbox" checked={sharedOnly} onChange={handleShared}></input></span>
        <select
          className={`budget-payment__select ${currentPayment}`}
          value={currentPayment}
          onChange={handlePaymentChange}
        >
          <option className="budget-payment__option" value="all">
            全ての支払い方法
          </option>
          <option className="budget-payment__option" value="credit">
            クレジット
          </option>
          <option className="budget-payment__option" value="cash">
            現金
          </option>
        </select>
        <select
          className={`budget-category__select ${currentCategory}`}
          value={currentCategory}
          onChange={handleCategoryChange}
        >
          <option className="budget-category__option" value="all">
            全てのカテゴリー
          </option>
          {categoryOptions}
        </select>
      </div>
      <ul className="budget-list__body">{items}</ul>
    </Fragment>
  );
}

export default CurrentList;
