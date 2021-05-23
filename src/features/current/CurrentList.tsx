import { Fragment } from "react";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { currentDeleted, currentSaved } from "./currentSlice";
import { categoryList } from "../../app/categoryList";
import deleteIcon from "../../icons/icon-delete.svg";
import creditcardIcon from "../../icons/icon-creditcard.svg";
import sharedIcon from "../../icons/shared.png";
import { Record } from '../../app/types/Record';
import "./CurrentList.scss";
import { StoreState } from '../../app/store';

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}

// styles

function CurrentList() {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentPayment, setCurrentPayment] = useState("all");
  const [sharedOnly, setSharedOnly] = useState(false);

  const categoryFilter = (items: Record[]) => {
    if (currentCategory === "all") return items;
    return items.filter((item) => {
      return item.category === currentCategory;
    });
  };
  const paymentFilter = (items: Record[]) => {
    if (currentPayment === "all") return items;
    return items.filter((item) => {
      return item.pay === currentPayment;
    });
  };

  const sharedFilter = (items: Record[]) => {
    if (!sharedOnly) return items;
    return items.filter((item) => item.shared);
  }

  const list = sharedFilter(paymentFilter(categoryFilter(useSelector((state) => state.current))));

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value);
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPayment(e.target.value);
  }

  const handleDelete = (id: string) => {
    dispatch(currentDeleted(id));
    dispatch(currentSaved(null));
  }

  const handleShared = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSharedOnly(e.target.checked);
  }

  const items = list.map((item, index) => {
    const date = DateTime.fromFormat(item.date, "yyyy-MM-dd").toFormat("MM/dd");
    const category = categoryList.find(
      (category) => category.value === item.category
    );
    const creditIconElement = item.pay === 'credit' 
      ? <img className="budget-list__payment" src={creditcardIcon} alt="creditcard"></img>
      : '';

    const sharedIconElement = item.shared
      ? <img className="budget-list__shared" src={sharedIcon} alt="sharedIcon"></img>
      : '';
    return (
      <li className="budget-list__item" key={index}>
        <span className="budget-list__date">{date}</span>
        <span className="budget-list__price">
          ¥{parseInt(item.price).toLocaleString()}
        </span>
        <span className="budget-list__desc">{item.desc}</span>
        {sharedIconElement}
        {creditIconElement}
        <span className={`budget-list__category ${item.category}`}>
          {category!.name}
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
