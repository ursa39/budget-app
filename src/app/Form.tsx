import React, { useState, useRef } from "react";
import { DateTime } from "luxon";
import { useDispatch } from "react-redux";
import { currentAdded, currentSaved } from "../features/current/currentSlice";
import { categoryList } from './categoryList';
import { nanoid } from 'nanoid'

// styles
import "./Form.scss";

const Form: React.FC = () => {
  const dispatch = useDispatch();
  const [inputDate, setInputDate] = useState(
    DateTime.local().toFormat("yyyy-MM-dd")
  );
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };

  const [inputPrice, setInputPrice] = useState("");
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(e.target.value);
  };

  const [inputCategory, setInputCategory] = useState("noCategory");
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputCategory(e.target.value);
  };

  const [inputPayer, setInputPayer] = useState("person1");
  const handlePayerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputPayer(e.target.value);
  };

  const [inputDesc, setInputDesc] = useState("");
  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDesc(e.target.value);
  };

  const [inputPayment, setInputPayment] = useState("credit");
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPayment(e.target.value);
  };

  const [inputShared, setIinputShared] = useState(false);
  const handleSharedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIinputShared(e.target.checked);
  };

  const resetInputValue = () => {
    setInputDate(DateTime.local().toFormat("yyyy-MM-dd"));
    setInputPrice("");
    setInputDesc("");
    setInputCategory("noCategory");
    setInputPayment("credit");
    setInputPayer("person1");
    setIinputShared(false);
  };

  const dateInputEl = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetInputValue();
    dispatch(
      currentAdded({
        id: nanoid(),
        date: inputDate,
        price: inputPrice,
        category: inputCategory,
        desc: inputDesc,
        pay: inputPayment,
        shared: inputShared,
        payer: inputPayer
      })
    );
    dispatch(currentSaved(null));
    dateInputEl.current!.focus();
  };

  const categoryOptions = categoryList.map(category => {
    return <option value={category.value} key={category.value}>{category.name}</option>;
  });

  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <div className="budget-form__row">
        <input
          className="budget-form__date"
          type="date"
          value={inputDate}
          onChange={handleDateChange}
          ref={dateInputEl}
        ></input>
        <input
          className="budget-form__price"
          type="text"
          name="price"
          value={inputPrice}
          onChange={handlePriceChange}
        ></input>
        <select className="budget-form__category" value={inputCategory} onChange={handleCategoryChange}>
          {categoryOptions}
        </select>
        <select className="budget-form__payer" value={inputPayer} onChange={handlePayerChange}>
          <option value="person1">Person1</option>
          <option value="person2">Person2</option>
        </select>
        <input className="budget-form__submit" type="submit" value="submit" />
        <div className="budget-form__payment">
          <label><input className="budget-form__radio" name="payment" type="radio" value="credit" checked={inputPayment === 'credit'} onChange={handlePaymentChange} />クレジット</label>
          <label><input className="budget-form__radio" name="payment" type="radio" value="cash" checked={inputPayment === 'cash'} onChange={handlePaymentChange} />現金</label>
        </div>
        <div className="budget-form__shared">
          <label>
            <input type="checkbox" checked={inputShared} onChange={handleSharedChange}></input>
            共同支出
          </label>
        </div>
      </div>
      <div className="budget-form__row">
        <input
          className="budget-form__desc"
          type="text"
          list="descOption"
          name="desc"
          value={inputDesc}
          onChange={handleDescChange}
        ></input>
        <datalist id="descOption">
          <option value="食費"></option>　<option value="生活雑貨"></option>　
          <option value="Suica"></option>
        </datalist>
      </div>
    </form>
  );
}

export default Form;
