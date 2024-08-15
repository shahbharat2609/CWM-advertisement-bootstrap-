import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import ImageCropUploader from "./components/common/ImageComponent";
import {
  adTypes,
  groupOptions,
  plans,
  products,
  services,
} from "./utils/constants";

function App() {
  const [subscription, setSubscription] = useState<string>("advertisement");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [renewalDate, setRenewalDate] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<string>("");
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [rebate, setRebate] = useState<string>("");
  const [toPay, setToPay] = useState<string>("");
  const [adType, setAdType] = useState<string>("");
  const [selectedFlag, setSelectedFlag] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [save, setSave] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [group, setGroup] = useState<string>("");
  const [terms, setTerms] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [article, setArticle] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [servicesMenu, setServicesMenu] = useState<string>("");
  const [productsMenu, setProductsMenu] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const filteredOptions = plans.filter(
    (plan) => plan.subscription === subscription
  );
  const handleSave = () => {
    if (!acceptTerms) {
      alert("Please accept the terms and conditions!");
      return;
    }
    setSave(true);
    setCancel(false);
    alert("Details Saved successfully!");
  };

  const handleCancel = () => {
    const result = confirm(
      "You will lose all the changes. Do you want to continue?"
    );
    if (result) {
      setSave(false);
      setSubscription("advertisement");
      setSelectedPlan("");
      setVoucherCode("");
      setRebate("");
      setSelectedFlag("");
      setCategory("");
      setServicesMenu("");
      setProductsMenu("");
      setAcceptTerms(false);
      setAdType("");
      setArticle("");
      setPincode("");
      setArea("");
      setCancel(true);
      setGroup("");
      setTitle("");
      setTerms("");
      setCondition("");
      setPrice("");
      setDescription("");
    }
  };

  useEffect(() => {
    const defaultPlan = filteredOptions[0]?.label || "";
    setSelectedPlan(defaultPlan);
  }, [subscription]);

  useEffect(() => {
    if (selectedPlan) {
      const plan = plans.find((plan) => plan.label === selectedPlan);
      if (plan) {
        const today = new Date();
        const renewal = new Date();

        if (plan.duration.months) {
          renewal.setMonth(today.getMonth() + plan.duration.months);
        }
        if (plan.duration.years) {
          renewal.setFullYear(today.getFullYear() + plan.duration.years);
        }

        setRenewalDate(renewal.toISOString().substring(0, 10));
        setAmount(plan.value);
        setRebate("");
        setToPay(plan.value);
        setVoucherCode("");
      } else {
        setRenewalDate(undefined);
        setAmount("");
        setRebate("");
        setToPay("");
      }
    }
  }, [selectedPlan]);

  const applyVoucher = () => {
    if (voucherCode === "BLAUNK100") {
      setRebate(amount);
      setToPay("0");
      setAmount("0");
    } else {
      setRebate("");
      setToPay(amount);
    }
  };

  return (
    <>
      <Accordion defaultActiveKey="0" flush>
        {/* //!Subscription */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Subscription</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row>
                <Col lg={2} md={4} sm={6} xs={12}>
                  <Form.Group controlId="subscriptionSelect">
                    <Form.Label>Subscription</Form.Label>
                    <Form.Select
                      value={subscription}
                      onChange={(event) => setSubscription(event.target.value)}
                      disabled={save}
                    >
                      <option value="advertisement">Advertisement</option>
                      <option value="blaunkDial">Blaunk Dial</option>
                      <option value="marketFeed">Market Feed</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={2} md={4} sm={6} xs={12}>
                  <Form.Group controlId="planSelect">
                    <Form.Label>Plan</Form.Label>
                    <Form.Select
                      value={selectedPlan}
                      onChange={(event) => {
                        setSelectedPlan(event.target.value);
                      }}
                      disabled={save}
                    >
                      {filteredOptions.map((plan) => (
                        <option key={plan.label} value={plan.label}>
                          {plan.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={2} md={4} sm={6} xs={12}>
                  <Form.Group controlId="currentDateInput">
                    <Form.Label>Subscription Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={new Date().toISOString().substring(0, 10)}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col lg={2} md={4} sm={6} xs={12}>
                  <Form.Group controlId="renewalDateInput">
                    <Form.Label>Renewal Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={renewalDate || ""}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col lg={2} md={4} sm={6} xs={12}>
                  <Form.Group controlId="amountInput">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="text" value={amount} readOnly />
                  </Form.Group>
                </Col>
                <Col lg={2} md={4} sm={6} xs={12}>
                  <Form.Group controlId="voucherCodeInput">
                    <Form.Label>Voucher Code</Form.Label>
                    <div className="voucher-container">
                      <Form.Control
                        type="text"
                        value={voucherCode}
                        onChange={(event) => setVoucherCode(event.target.value)}
                        disabled={save}
                      />
                      <IoSearchOutline
                        className="voucher-icon"
                        onClick={applyVoucher}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col lg={2} md={4} sm={6} xs={12}>
                  <Form.Group controlId="rebateInput">
                    <Form.Label>Rebate</Form.Label>
                    <Form.Control type="text" value={rebate} readOnly />
                  </Form.Group>
                </Col>
                <Col lg={2} md={4} sm={6} xs={12}>
                  <Form.Group controlId="toPayInput">
                    <Form.Label>To Pay</Form.Label>
                    <Form.Control type="text" value={toPay} readOnly />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>

        {/* //!Advertisement */}
        {subscription === "advertisement" && (
          <Accordion.Item eventKey="1">
            <Accordion.Header>Advertisement</Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <Col lg={2} md={4} sm={6} xs={12}>
                    <Form.Label>Country</Form.Label>
                    <ReactFlagsSelect
                      countries={[
                        "IN",
                        "BH",
                        "BD",
                        "BT",
                        "ID",
                        "JO",
                        "MY",
                        "MV",
                        "PH",
                        "SG",
                        "LK",
                        "AE",
                        "QA",
                        "VN",
                      ]}
                      customLabels={{
                        IN: "India",
                        BH: "Bahrain",
                        BD: "Bangladesh",
                        BT: "Bhutan",
                        ID: "Indonesia",
                        JO: "Jordan",
                        MY: "Malaysia",
                        MV: "Maldives",
                        PH: "Philippines",
                        SG: "Singapore",
                        LK: "Sri Lanka",
                        AE: "United Arab Emirates",
                        QA: "Qatar",
                        VN: "Vietnam",
                      }}
                      selected={selectedFlag}
                      onSelect={(code) => setSelectedFlag(code)}
                      placeholder="Select Country"
                      disabled={save}
                    />
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="typeSelect">
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        value={adType || ""}
                        onChange={(event) => setAdType(event.target.value)}
                        disabled={save}
                      >
                        <option value="">Select a type</option>
                        <option value="homePage">Home Page</option>
                        <option value="bgt">BGT</option>
                        <option value="tour">Tour</option>
                        <option value="cake">Cake</option>
                        <option value="store">Store</option>
                        <option value="boutique">Boutique</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="selectAds">
                      <Form.Label>Select Ads</Form.Label>
                      <Form.Select disabled={save}>
                        {adTypes[adType]?.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        )) || <option value="">No options available</option>}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="groupSelect">
                      <Form.Label>Group</Form.Label>
                      <Form.Select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        disabled={save}
                      >
                        <option value="" disabled>
                          Select a group
                        </option>
                        {groupOptions.map((group, index) => (
                          <option key={index} value={group}>
                            {group}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="articleInput">
                      <Form.Label>Article</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Max 50 characters"
                        maxLength={50}
                        disabled={save}
                        value={article}
                        onChange={(event) => setArticle(event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="zipCodeInput">
                      <Form.Label>Zip code/Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        inputMode="numeric"
                        maxLength={7}
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.value = target.value.replace(/[^0-9]/g, "");
                        }}
                        disabled={save}
                        value={pincode}
                        onChange={(event) => setPincode(event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="areaInput">
                      <Form.Label>Area</Form.Label>
                      <Form.Control
                        type="text"
                        inputMode="numeric"
                        disabled={save}
                        value={area}
                        onChange={(event) => setArea(event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <ImageCropUploader
                      save={save}
                      cancel={cancel}
                      setCancel={setCancel}
                    />
                  </Col>
                </Row>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        )}

        {/* //!Blaunk Dial */}
        {subscription === "blaunkDial" && (
          <Accordion.Item eventKey="2">
            <Accordion.Header>Blaunk Dial</Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <Col lg={2} md={4} sm={6} xs={12}>
                    <Form.Label>Country</Form.Label>
                    <ReactFlagsSelect
                      countries={[
                        "IN",
                        "BH",
                        "BD",
                        "BT",
                        "ID",
                        "JO",
                        "MY",
                        "MV",
                        "PH",
                        "SG",
                        "LK",
                        "AE",
                        "QA",
                        "VN",
                      ]}
                      customLabels={{
                        IN: "India",
                        BH: "Bahrain",
                        BD: "Bangladesh",
                        BT: "Bhutan",
                        ID: "Indonesia",
                        JO: "Jordan",
                        MY: "Malaysia",
                        MV: "Maldives",
                        PH: "Philippines",
                        SG: "Singapore",
                        LK: "Sri Lanka",
                        AE: "United Arab Emirates",
                        QA: "Qatar",
                        VN: "Vietnam",
                      }}
                      selected={selectedFlag}
                      onSelect={(code) => setSelectedFlag(code)}
                      placeholder="Select Country"
                      disabled={save}
                    />
                  </Col>
                  <Col lg={2} md={4} sm={6} xs={12}>
                    <Form.Group controlId="zipCodeInput">
                      <Form.Label>Zip code/Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        inputMode="numeric"
                        maxLength={7}
                        value={pincode}
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.value = target.value.replace(/[^0-9]/g, "");
                        }}
                        onChange={(event) => setPincode(event.target.value)}
                        disabled={save}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={4} sm={6} xs={12}>
                    <Form.Group controlId="categorySelect">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        value={category || ""}
                        onChange={(event) => setCategory(event.target.value)}
                        disabled={save}
                      >
                        <option value="">Select a category</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="artists">Artists</option>
                        <option value="prediction">Prediction Forecast</option>
                        <option value="transport">Transport</option>
                        <option value="mechanic">Mechanic</option>
                        <option value="itDevelopers">IT Developers</option>
                        <option value="property">Property</option>
                        <option value="tour">Tour Operator</option>
                        <option value="helper">Helper</option>
                        <option value="event">Event</option>
                        <option value="eventMgt">Event Management</option>
                        <option value="misc">Miscellaneous</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={4} sm={6} xs={12}>
                    <Form.Group controlId="servicesSelect">
                      <Form.Label>Services</Form.Label>
                      <Form.Select
                        value={servicesMenu}
                        onChange={(e) => setServicesMenu(e.target.value)}
                        disabled={save}
                      >
                        {services[category]?.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        )) || <option value="">No options available</option>}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  {servicesMenu === "Others" && (
                    <Col lg={2} md={4} sm={6} xs={12}>
                      <Form.Label>Others</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Max 15 characters"
                        disabled={save}
                        maxLength={15}
                      />
                    </Col>
                  )}
                </Row>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        )}
        {/* //!Market Feed */}
        {subscription === "marketFeed" && (
          <Accordion.Item eventKey="3">
            <Accordion.Header>Market Feed</Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <Col lg={2} md={4} sm={6} xs={12}>
                    <Form.Label>Country</Form.Label>
                    <ReactFlagsSelect
                      countries={[
                        "IN",
                        "BH",
                        "BD",
                        "BT",
                        "ID",
                        "JO",
                        "MY",
                        "MV",
                        "PH",
                        "SG",
                        "LK",
                        "AE",
                        "QA",
                        "VN",
                      ]}
                      customLabels={{
                        IN: "India",
                        BH: "Bahrain",
                        BD: "Bangladesh",
                        BT: "Bhutan",
                        ID: "Indonesia",
                        JO: "Jordan",
                        MY: "Malaysia",
                        MV: "Maldives",
                        PH: "Philippines",
                        SG: "Singapore",
                        LK: "Sri Lanka",
                        AE: "United Arab Emirates",
                        QA: "Qatar",
                        VN: "Vietnam",
                      }}
                      selected={selectedFlag}
                      onSelect={(code) => setSelectedFlag(code)}
                      placeholder="Select Country"
                      disabled={save}
                    />
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="groupSelect">
                      <Form.Label>Group</Form.Label>
                      <Form.Select
                        value={group || ""}
                        onChange={(event) => setGroup(event.target.value)}
                        disabled={save}
                      >
                        <option value="">Select a type</option>
                        <option value="clubAndResort">Club & Resort</option>
                        <option value="property">Property</option>
                        <option value="appliances">Applicances</option>
                        <option value="usedVehicle">Used Vehicle</option>
                        <option value="d2h">D2H</option>
                        <option value="misc">Miscellaneous</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12}>
                    <Form.Group controlId="selectAds">
                      <Form.Label>Products</Form.Label>
                      <Form.Select
                        value={productsMenu}
                        onChange={(e) => setProductsMenu(e.target.value)}
                        disabled={save}
                      >
                        {products[group]?.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        )) || <option value="">No options available</option>}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  {productsMenu === "Others" && (
                    <Col lg={2} md={4} sm={6} xs={12}>
                      <Form.Label>Others</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Max 15 characters"
                        disabled={save}
                        maxLength={15}
                      />
                    </Col>
                  )}
                  <Col lg={2} md={3} sm={6} xs={12}>
                    <Form.Group controlId="titleField">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Max 25 characters"
                        maxLength={25}
                        disabled={save}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12}>
                    <Form.Label>Terms</Form.Label>
                    <Form.Select
                      disabled={save}
                      value={terms}
                      onChange={(e) => setTerms(e.target.value)}
                    >
                      <option value="" disabled>
                        Select terms
                      </option>
                      <option value="negotiable">Negotiable</option>
                      <option value="nonNegotiable">Non-negotiable</option>
                      <option value="priceOnRequest">Price on request</option>
                    </Form.Select>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12}>
                    <Form.Label>Condition</Form.Label>
                    <Form.Select
                      disabled={save}
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Condition
                      </option>
                      <option value="unused">Unused</option>
                      <option value="used">Used</option>
                      <option value="organic">Organic</option>
                      <option value="refurbished">Refurbished</option>
                    </Form.Select>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12}>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      value={price}
                      inputMode="numeric"
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/[^0-9]/g, "");
                      }}
                      onChange={(e) => setPrice(e.target.value)}
                      disabled={save}
                    />
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="zipCodeInput">
                      <Form.Label>Zip code/Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        inputMode="numeric"
                        maxLength={7}
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.value = target.value.replace(/[^0-9]/g, "");
                        }}
                        disabled={save}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12}>
                    <Form.Group controlId="areaInput">
                      <Form.Label>Area</Form.Label>
                      <Form.Control
                        type="text"
                        inputMode="numeric"
                        disabled={save}
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={3} sm={6} xs={12}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      maxLength={150}
                      placeholder="Max 150 characters"
                      disabled={save}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                  {[1, 2, 3].map((index) => (
                    <Col
                      lg={4}
                      md={4}
                      sm={12}
                      xs={12}
                      key={index}
                      className="mb-3"
                    >
                      <ImageCropUploader
                        save={save}
                        cancel={cancel}
                        setCancel={setCancel}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        )}
        {/* //!Disclaimer */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>Disclaimer</Accordion.Header>
          <Accordion.Body>
            <p className="disclaimer-text">
              We agree with Terms & Condition of B2B Blaunk Trade. Free Returns
              and Refund if Buyer is not satisfied with goods received and found
              vary or different from product image.
            </p>
            <p className="disclaimer-text">
              Blaunk will not be held liable for any legal or claiming, as this
              is only an Online platform for secure trade between vendors &
              Customer.
            </p>
            <p className="disclaimer-text">
              This post will be valid as per Plan selected and get auto deleted.
              Return policy is only valid if vendor failed to supply promised
              articles.
            </p>
            <p className="disclaimer-text">
              Seller Profile or Product Listing will be Blocked or Delist, if
              found continious Cancel/Non Supply of Goods or Services or any
              fraudlent activity got noted.
            </p>
            <p className="disclaimer-text">
              Listing fees is Non - Refundable and Inclusive of all Govt Levies
              & Taxes.
            </p>
            <p className="disclaimer-text">
              <Form.Check
                className="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              I have read and agree to all the terms and condition of B2B Blaunk
              trade policy.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Container className="text-center mt-4">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button variant="danger" className="mx-2" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="success" className="mx-2" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="warning"
              className="mx-2"
              onClick={() => setSave(false)}
            >
              Edit
            </Button>
            <Button variant="primary" className="mx-2">
              Payment
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
