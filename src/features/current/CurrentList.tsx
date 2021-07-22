import React, { Fragment } from "react";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { currentDeleted, currentSaved, currentUpdated } from "./currentSlice";
import { categoryList } from "../../app/categoryList";
import deleteIcon from "../../icons/icon-delete.svg";
import creditcardIcon from "../../icons/icon-creditcard.svg";
import {ReactComponent as SettledIcon} from '../../icons/icon-check.svg';
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
  const [currentPayer, setCurrentPayer] = useState("all");
  const [currentSharing, setSharing] = useState("all");

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
  const payerFilter = (items: Record[]) => {
    if (currentPayer === "all") return items;
    return items.filter((item) => {
      return item.payer === currentPayer;
    });
  };

  const sharingFilter = (items: Record[]) => {
    if (currentSharing === "all") return items;
    if (currentSharing === "mine") return items.filter((item) => !item.shared);
    return items.filter((item) => item.shared);
  }
  const currentRecords = useSelector((state) => state.current)
  const list = payerFilter(sharingFilter(paymentFilter(categoryFilter(currentRecords))));

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value);
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPayment(e.target.value);
  }

  const handlePayerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPayer(e.target.value);
  }

  const handleDelete = (id: string) => {
    dispatch(currentDeleted(id));
    dispatch(currentSaved(null));
  }

  const handleSharing = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSharing(e.target.value);
  }

  const handleSettled = (e: React.MouseEvent<HTMLSpanElement>) => {
    const id = e.currentTarget.getAttribute('data-index')!
    const recordsCopy = currentRecords.map(record => ({...record}))
    const targetItem = recordsCopy.find(record => record.id === id)!
    targetItem.settled = !targetItem.settled
    dispatch(
      currentUpdated(recordsCopy)
    );
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
        <span
          className={[
            "budget-list__settled",
            item.settled ? "settled" : "",
          ].join(" ")}
          onClick={handleSettled}
          data-index={item.id}
        >
          <SettledIcon />
        </span>
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
        <span
          className="budget-list__delete"
          onClick={() => handleDelete(item.id)}
        >
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
        <select
          className={'budget-sharing__select'}
          value={currentSharing}
          onChange={handleSharing}
        >
          <option className="budget-sharing__option" value="all">
            全ての支出区分
          </option>
          <option className="budget-sharing__option" value="mine">
            自分の支出
          </option>
          <option className="budget-sharing__option" value="shared">
            共同支出
          </option>
        </select>
        <select
          className={`budget-payer__select ${currentPayer}`}
          value={currentPayer}
          onChange={handlePayerChange}
        >
          <option className="budget-payer__option" value="all">
            全ての支払人
          </option>
          <option className="budget-payer__option" value="person1">
            Person1
          </option>
          <option className="budget-payer__option" value="person2">
            Person2
          </option>
        </select>
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
