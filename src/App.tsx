import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import ImageCropUploader from "./components/common/ImageComponent";

interface CountryType {
  code: string;
  label: string;
  phone: string;
}

const plans = [
  // Advertisement Plans
  {
    label: "Premium - 1Y Validity",
    value: "1999",
    duration: { years: 1 },
    subscription: "advertisement",
  },
  {
    label: "Platinum - 1Y Validity",
    value: "999",
    duration: { years: 1 },
    subscription: "advertisement",
  },
  {
    label: "Gold - 6M Validity",
    value: "800",
    duration: { months: 6 },
    subscription: "advertisement",
  },
  {
    label: "Silver - 3M Validity",
    value: "500",
    duration: { months: 3 },
    subscription: "advertisement",
  },

  // Market Place Plans
  {
    label: "Premium - 2M Validity",
    value: "500",
    duration: { months: 2 },
    subscription: "marketFeed",
  },
  {
    label: "Standard - 2M Validity",
    value: "300",
    duration: { months: 2 },
    subscription: "marketFeed",
  },

  // Blaunk Dial Plans
  {
    label: "Premium - 1Y Validity",
    value: "1999",
    duration: { years: 1 },
    subscription: "blaunkDial",
  },
  {
    label: "Platinum - 1Y Validity",
    value: "999",
    duration: { years: 1 },
    subscription: "blaunkDial",
  },
  {
    label: "Gold - 6M Validity",
    value: "800",
    duration: { months: 6 },
    subscription: "blaunkDial",
  },
  {
    label: "Silver - 3M Validity",
    value: "500",
    duration: { months: 3 },
    subscription: "blaunkDial",
  },
];

const adTypes: Record<string, string[]> = {
  homePage: ["Business Card", "Slider", "Category", "Deal & Offer", "Explore"],
  bgt: ["Running ad", "Slider"],
  tour: ["Deal & Offer", "Explore"],
  cake: ["Deal & Offer", "Explore"],
  store: ["Deal & Offer", "Explore"],
  boutique: [
    "Women's collection",
    "Men's collection",
    "Style on rent",
    "Deal & Offer",
    "Explore",
    "Indian Celebrity Designer",
    "International Celebrity Designer",
  ],
};

const services: Record<string, string[]> = {
  healthcare: [
    "Hair Salon",
    "Spa",
    "Ayurvedic Spa",
    "Physiotherapist",
    "Others",
  ],
  artists: [
    "Henna Artist",
    "Tattoo Artist",
    "Makeup Artist",
    "Nail Artist",
    "Saree Draper",
    "Costume Designer",
    "Sketch Artist",
    "Portrait",
    "Sculptor",
    "Clay Artist",
    "Others",
  ],
  prediction: [
    "Pandit",
    "Priest",
    "Astrologer",
    "Palmistry",
    "Vastu",
    "Tarot Reader",
    "Numerologist",
    "Gemologist",
    "Others",
  ],
  transport: [
    "Packers & Movers",
    "Driver",
    "Fleet Agent",
    "Transporters",
    "Vehicle on rent",
    "Custom Agent",
    "Courier Services",
    "Logistics",
    "Cargo Services",
    "Others",
  ],
  mechanic: [
    "Mechanic by night",
    "All Engine Service",
    "Truck Ecm Repair",
    "Breakdown Services",
    "Bike Repairs",
    "Car Repairs",
    "Car Electrical Service",
    "Car Battery Repair",
    "Accident Towing",
    "Others",
  ],
  event: [
    "Workshops",
    "Comedy Shows",
    "Screenings",
    "Spirituality",
    "Exhibition",
    "Meetups",
    "Kids",
    "Performances",
    "Talks",
    "Festivals",
    "Conferences",
    "Sports",
    "Competitions",
    "Others",
  ],
  eventMgt: [
    "Inhouse decorator",
    "Outdoor decorator",
    "Wedding Planner",
    "Orchestra",
    "Balloon Arch",
    "Balloon Backdrop",
    "Sound Systems",
    "Flower Decorators",
    "Event Organizers",
    "Birthday Party Organizers",
    "Tent House",
    "Costumes on rent",
    "Office Decorators",
    "Caterers",
    "Pre wedding shoot",
    "Car decoration",
    "Pandit",
    "Anchoring Services",
    "Photographers",
    "Advertising agencies",
    "DJ",
    "Venue Selection",
    "Others",
  ],
  itDevelopers: [
    "Web Developer",
    "WordPress Developer",
    " Software Engineer",
    "Front-End Developer",
    "Mobile Application Developer",
    "Game Developer",
    "Back-End Developer",
    "Big Data Developer",
    "Developmental Operations Engineer",
    "Data Scientist",
    "Security Developer",
    "Graphics Developer",
    "Language developer",
    "Desktop developer",
    "Software developer",
    "Operating systems developer",
    "Embedded systems developer",
    "CRM developer",
    "Full stack developer",
    "Software Tester",
    "MERN Developer",
    "UI/UX Designer",
    "Others",
  ],
  property: [
    "Real Estate Agent",
    "Property Dealers",
    "Property Developers",
    "Property Consultants",
    "Property Valuers",
    "Property Registration Consultants",
    "Property Lawyers",
    "Others",
  ],
  tour: [
    "Flight Booking",
    "Bus Booking",
    "Railway Booking",
    "Hotel Booking",
    "Domestic Package",
    "International Package",
    " Others",
  ],
  helper: [
    "House Cook",
    "House Maid",
    "Gardener",
    "Electrician",
    "Plumber",
    "Carpenter",
    "Others",
  ],
  misc: ["Gym", "Music", "Others"],
};

const products: Record<string, string[]> = {
  clubAndResort: ["Used membership", "New (Agent)"],
  property: [
    "For Sale",
    "On Lease Office",
    "On Lease House",
    "Land commercial",
    "Land Agriculture",
    "For Rent",
    "Fully furnished house",
    "Semi-furnished House",
    "Pent house",
    "Sharing office",
    "Fully furnished office",
    "Farm house",
    "Apartment",
    "Mall Shop On Rent",
    "Villa",
    "Independent House",
    "Residential Plot",
    "Bungalow",
    "Paying Guest",
  ],
  appliances: [
    "Kitchen appliances",
    "Hotel appliances",
    "Office appliances",
    "Electronic appliances",
    "Others",
  ],
  usedVehicle: [
    "2 wheeler",
    "Auto",
    "Car",
    "Mini Truck",
    "EV",
    "Spare parts",
    "Others",
  ],
  d2h: ["Connection", "Service", "Spares", "Others"],
  misc: ["Books", "Sports", "Gym", "Musical Instruments", "Others"],
};

const groupOptions: string[] = [
  "Education",
  "Accessories",
  "Agro -Dry fruits",
  "Agro -Fruits",
  "Agro -Grains",
  "Agro -Seeds",
  "Agro -Spices",
  "Agro -Veggies",
  "AGRO-Fertilizer",
  "Apparel -Kids",
  "Apparel -Men",
  "Apparel -Women",
  "Art and Gallery",
  "Bathroom Accessories",
  "Books",
  "Chemicals",
  "Cleaners",
  "Computer",
  "Construction",
  "Cosmetic -Women",
  "Cosmetic -Men",
  "cosmetics-Kids",
  "Electrical",
  "Electronics",
  "Food and Beverages",
  "Footwear",
  "Gardening",
  "Handmade",
  "Hardware",
  "Heavy Tools",
  "Herbal Nutrition",
  "Kitchen Appliances",
  "Kitchen ware",
  "Machinery",
  "Packaging",
  "Plastic Ware",
  "Sports",
  "Stationery",
  "Textile Fabrics",
  "Threads and Laces",
  "Toys",
  "Vehicle Operator",
  "Jewellers",
  "IT Developer",
  "Services",
  "Tourism",
];

const countries: readonly CountryType[] = [
  { code: "IN", label: "India", phone: "91" },
  { code: "BH", label: "Bahrain", phone: "973" },
  { code: "BD", label: "Bangladesh", phone: "880" },
  { code: "BT", label: "Bhutan", phone: "975" },
  { code: "ID", label: "Indonesia", phone: "62" },
  { code: "JO", label: "Jordan", phone: "962" },
  { code: "ðŸ‡²ðŸ‡¾", label: "Malaysia", phone: "60" },
  { code: "MV", label: "Maldives", phone: "960" },
  { code: "PH", label: "Philippines", phone: "63" },
  { code: "SG", label: "Singapore", phone: "65" },
  { code: "LK", label: "Sri Lanka", phone: "94" },
  { code: "AE", label: "United Arab Emirates", phone: "971" },
  { code: "QA", label: "Qatar", phone: "974" },
  { code: "VN", label: "Vietnam", phone: "84" },
];

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
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const filteredOptions = plans.filter(
    (plan) => plan.subscription === subscription
  );

  useEffect(() => {
    const defaultPlan = filteredOptions[0]?.value || "";
    setSelectedPlan(defaultPlan);
  }, [subscription]);

  useEffect(() => {
    if (selectedPlan) {
      const plan = plans.find((plan) => plan.value === selectedPlan);
      if (plan) {
        const today = new Date();
        const renewal = new Date(today);

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
      <Accordion defaultActiveKey="0">
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
                      onChange={(event) => setSelectedPlan(event.target.value)}
                    >
                      {filteredOptions.map((plan) => (
                        <option key={plan.value} value={plan.value}>
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
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="countrySelect">
                      <Form.Label>Country</Form.Label>
                      <Form.Control as="select">
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="typeSelect">
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        value={adType || ""}
                        onChange={(event) => setAdType(event.target.value)}
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
                      <Form.Select>
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
                      <Form.Control type="text" />
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
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="areaInput">
                      <Form.Label>Area</Form.Label>
                      <Form.Control type="text" inputMode="numeric" />
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
                    />
                  </Col>
                  <Col lg={3} md={4} sm={6} xs={12}>
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
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={4} sm={6} xs={12}>
                    <Form.Group controlId="categorySelect">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        value={category || ""}
                        onChange={(event) => setCategory(event.target.value)}
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
                  <Col lg={3} md={4} sm={6} xs={12}>
                    <Form.Group controlId="servicesSelect">
                      <Form.Label>Services</Form.Label>
                      <Form.Select>
                        {services[category]?.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        )) || <option value="">No options available</option>}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={4} sm={6} xs={12}></Col>
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
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="countrySelect">
                      <Form.Label>Country</Form.Label>
                      <Form.Control as="select">
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.label}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="groupSelect">
                      <Form.Label>Group</Form.Label>
                      <Form.Select
                        value={group || ""}
                        onChange={(event) => setGroup(event.target.value)}
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
                      <Form.Select>
                        {products[group]?.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        )) || <option value="">No options available</option>}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12}>
                    <Form.Group controlId="titleField">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={25}
                      />
                      <Form.Text className="text-muted">
                        Max 25 characters
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12}>
                    <Form.Label>Terms</Form.Label>
                    <Form.Select>
                      <option value="negotiable">Negotiable</option>
                      <option value="nonNegotiable">Non-negotiable</option>
                      <option value="priceOnRequest">Price on request</option>
                    </Form.Select>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12}>
                    <Form.Label>Condition</Form.Label>
                    <Form.Select>
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
                      onChange={(e) => setPrice(e.target.value)}
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
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={2} md={3} sm={6} xs={12} className="mb-3">
                    <Form.Group controlId="areaInput">
                      <Form.Label>Area</Form.Label>
                      <Form.Control type="text" inputMode="numeric" />
                    </Form.Group>
                  </Col>
                  <Col lg={6} md={3} sm={6} xs={12}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" maxLength={100} />
                    <Form.Text>Max 25 words</Form.Text>
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
              <Form.Check className="checkbox" />I have read and agree to all
              the terms and condition of B2B Blaunk trade policy.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Container className="text-center mt-4">
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button variant="secondary" className="mx-2">
              Cancel
            </Button>
            <Button
              variant="primary"
              className="mx-2"
              onClick={() => {
                setSave(true);
                setCancel(false);
                alert("Details Saved successfully!");
              }}
            >
              Save
            </Button>
            <Button variant="warning" className="mx-2">
              Edit
            </Button>
            <Button variant="success" className="mx-2">
              Payment
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
