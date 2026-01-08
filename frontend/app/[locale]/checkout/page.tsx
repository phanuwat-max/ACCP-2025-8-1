"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

interface RegistrationPackage {
  id: string;
  priceUSD: number;
  priceTHB: number;
  originalPriceUSD?: number;
  originalPriceTHB?: number;
}

interface AddOn {
  id: string;
  priceUSD: number;
  priceTHB: number;
}

const registrationPackages: RegistrationPackage[] = [
  {
    id: "student",
    priceUSD: 250,
    priceTHB: 4900,
    originalPriceUSD: 270,
    originalPriceTHB: 4900,
  },
  {
    id: "professional",
    priceUSD: 385,
    priceTHB: 7900,
    originalPriceUSD: 400,
    originalPriceTHB: 8900,
  },
];

const addOns: AddOn[] = [
  {
    id: "workshop",
    priceUSD: 70,
    priceTHB: 2100,
  },
  {
    id: "gala",
    priceUSD: 75,
    priceTHB: 2200,
  },
];

export default function Checkout() {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Determine if user is Thai based on isThai flag (set during signup/login)
  const isThai = user?.isThai === true;

  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Form states
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "",
    country: user?.country || "",
    institution: "",
    dietaryRequirement: "none",
    specialNeeds: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "card">("card");

  // Check authentication and get selected package from URL
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    } else {
      let packageParam = searchParams.get("package");

      // Strict package logic based on user role
      const isStudent = user?.delegateType === 'thai_student' || user?.delegateType === 'international_student';

      if (isStudent) {
        // Students default to student package
        if (!packageParam) {
          packageParam = "student";
        }
      } else {
        // All Pharmacists are forced to professional package
        packageParam = "professional";
      }

      setSelectedPackage(packageParam);
      setIsLoading(false);
    }
  }, [isAuthenticated, router, locale, searchParams, user]);

  // Calculate total price based on isThai flag
  useEffect(() => {
    const pkg = registrationPackages.find((p) => p.id === selectedPackage);
    const packagePrice = isThai ? pkg?.priceTHB || 0 : pkg?.priceUSD || 0;
    const addOnsPrice = addOns
      .filter((a) => selectedAddOns.includes(a.id))
      .reduce((sum, a) => (isThai ? sum + a.priceTHB : sum + a.priceUSD), 0);
    setTotalPrice(packagePrice + addOnsPrice);
  }, [selectedPackage, selectedAddOns, isThai]);

  const handleAddOnChange = (addOnId: string) => {
    setSelectedAddOns((prev) => {
      if (prev.includes(addOnId)) {
        return prev.filter((id) => id !== addOnId);
      } else {
        return [...prev, addOnId];
      }
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim())
      errors.firstName = t("validation.firstNameRequired");
    if (!formData.lastName.trim())
      errors.lastName = t("validation.lastNameRequired");
    if (!formData.email.trim()) errors.email = t("validation.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = t("validation.emailInvalid");
    if (!formData.phone.trim()) errors.phone = t("validation.phoneRequired");
    if (!formData.country.trim())
      errors.country = t("validation.countryRequired");

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = () => {
    if (!validateForm()) {
      alert(t("validation.fillAllFields"));
      return;
    }
    // Navigate to payment page with order details
    router.push(`/${locale}/checkout/payment?amount=${totalPrice}&package=${selectedPackage}`);
  };

  if (!isAuthenticated || isLoading) {
    return null;
  }

  const currentPackage = registrationPackages.find(
    (p) => p.id === selectedPackage
  );

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          {/* Header */}
          <div
            className="inner-page-header"
            style={{ backgroundImage: "url(/assets/img/bg/header-bg16.png)" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-9 m-auto">
                  <div className="heading1 text-center">
                    <h1>{t("pageTitle")}</h1>
                    <div className="space20" />
                    <Link href={`/${locale}`}>
                      {tCommon("home")}{" "}
                      <i className="fa-solid fa-angle-right" />{" "}
                      <span>{t("breadcrumb")}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Section */}
          <div className="checkout-section-area sp1">
            <div className="container">
              <div className="row">
                {/* Left Column - Package Selection & Form */}
                <div className="col-lg-8">
                  {/* Step 1: Selected Package & Add-Ons */}
                  <div
                    className="checkout-box"
                    style={{
                      marginBottom: "30px",
                      padding: "25px",
                      border: "2px solid #00C853",
                      borderRadius: "10px",
                      backgroundColor: "#f0f9f6",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "25px",
                      }}
                    >
                      <i
                        className="fa-solid fa-check-circle"
                        style={{ color: "#00C853", fontSize: "18px" }}
                      ></i>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        {t("step1")}
                      </h3>
                    </div>

                    {/* Selected Package */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "15px",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        marginBottom: "25px",
                      }}
                    >
                      <div>
                        <p style={{ margin: "0 0 5px 0", fontWeight: "600" }}>
                          {t(`packages.${selectedPackage}`)}
                        </p>
                        <p
                          style={{ margin: 0, color: "#666", fontSize: "14px" }}
                        >
                          {t("earlyBirdPricing")}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "#00C853",
                          }}
                        >
                          {isThai ? "฿" : "$"}
                          {isThai
                            ? currentPackage?.priceTHB
                            : currentPackage?.priceUSD}
                        </p>
                        {(isThai
                          ? currentPackage?.originalPriceTHB
                          : currentPackage?.originalPriceUSD) && (
                            <p
                              style={{
                                margin: "5px 0 0 0",
                                fontSize: "12px",
                                color: "#999",
                                textDecoration: "line-through",
                              }}
                            >
                              {isThai ? "฿" : "$"}
                              {isThai
                                ? currentPackage?.originalPriceTHB
                                : currentPackage?.originalPriceUSD}
                            </p>
                          )}
                      </div>
                    </div>

                    {/* Add-Ons Selection */}
                    <div>
                      <h4
                        style={{
                          marginBottom: "15px",
                          fontSize: "16px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <i style={{ color: "#00C853" }}>🎁</i>
                        {t("addOnsOptional")}
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        {addOns.map((addOn) => (
                          <label
                            key={addOn.id}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              padding: "12px",
                              border: selectedAddOns.includes(addOn.id)
                                ? "2px solid #00C853"
                                : "1px solid #e0e0e0",
                              borderRadius: "6px",
                              cursor: "pointer",
                              backgroundColor: selectedAddOns.includes(addOn.id)
                                ? "#f0f9f6"
                                : "#fff",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedAddOns.includes(addOn.id)}
                              onChange={() => handleAddOnChange(addOn.id)}
                              style={{
                                marginTop: "4px",
                                cursor: "pointer",
                                width: "18px",
                                height: "18px",
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <p
                                style={{
                                  margin: "0 0 4px 0",
                                  fontWeight: "600",
                                }}
                              >
                                {t(
                                  addOn.id === "workshop"
                                    ? "preConferenceWorkshop"
                                    : "galaDinner"
                                )}
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  color: "#666",
                                  fontSize: "13px",
                                }}
                              >
                                {t(
                                  addOn.id === "workshop"
                                    ? "preConferenceWorkshopDesc"
                                    : "galaDinnerDesc"
                                )}
                              </p>
                            </div>
                            <div
                              style={{
                                fontWeight: "600",
                                color: "#00C853",
                                whiteSpace: "nowrap",
                              }}
                            >
                              +{isThai ? "฿" : "$"}
                              {isThai ? addOn.priceTHB : addOn.priceUSD}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Personal Details */}
                  <div
                    className="checkout-box"
                    style={{
                      marginBottom: "30px",
                      padding: "25px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "25px",
                      }}
                    >
                      <i
                        className="fa-solid fa-user"
                        style={{ color: "#00C853", fontSize: "18px" }}
                      ></i>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        {t("step2")}
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {t("firstName")}{" "}
                          <span style={{ color: "#ff6b6b" }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleFormChange}
                          placeholder={t("firstNamePlaceholder")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: formErrors.firstName
                              ? "2px solid #ff6b6b"
                              : "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                            boxSizing: "border-box",
                          }}
                        />
                        {formErrors.firstName && (
                          <p
                            style={{
                              color: "#ff6b6b",
                              fontSize: "11px",
                              margin: "4px 0 0 0",
                            }}
                          >
                            {formErrors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {t("lastName")}{" "}
                          <span style={{ color: "#ff6b6b" }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleFormChange}
                          placeholder={t("lastNamePlaceholder")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: formErrors.lastName
                              ? "2px solid #ff6b6b"
                              : "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                            boxSizing: "border-box",
                          }}
                        />
                        {formErrors.lastName && (
                          <p
                            style={{
                              color: "#ff6b6b",
                              fontSize: "11px",
                              margin: "4px 0 0 0",
                            }}
                          >
                            {formErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {t("email")}{" "}
                          <span style={{ color: "#ff6b6b" }}>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder={t("emailPlaceholder")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: formErrors.email
                              ? "2px solid #ff6b6b"
                              : "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                            boxSizing: "border-box",
                          }}
                        />
                        {formErrors.email && (
                          <p
                            style={{
                              color: "#ff6b6b",
                              fontSize: "11px",
                              margin: "4px 0 0 0",
                            }}
                          >
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {t("phone")}{" "}
                          <span style={{ color: "#ff6b6b" }}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder={t("phonePlaceholder")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: formErrors.phone
                              ? "2px solid #ff6b6b"
                              : "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                            boxSizing: "border-box",
                          }}
                        />
                        {formErrors.phone && (
                          <p
                            style={{
                              color: "#ff6b6b",
                              fontSize: "11px",
                              margin: "4px 0 0 0",
                            }}
                          >
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {t("institution")}
                        </label>
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleFormChange}
                          placeholder={t("institutionPlaceholder")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {t("country")}{" "}
                          <span style={{ color: "#ff6b6b" }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleFormChange}
                          placeholder={t("countryPlaceholder")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: formErrors.country
                              ? "2px solid #ff6b6b"
                              : "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                            boxSizing: "border-box",
                          }}
                        />
                        {formErrors.country && (
                          <p
                            style={{
                              color: "#ff6b6b",
                              fontSize: "11px",
                              margin: "4px 0 0 0",
                            }}
                          >
                            {formErrors.country}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div
                    className="checkout-box"
                    style={{
                      marginBottom: "30px",
                      padding: "25px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "25px",
                      }}
                    >
                      <i
                        className="fa-solid fa-utensils"
                        style={{ color: "#00C853", fontSize: "18px" }}
                      ></i>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        {t("specialRequirements")}
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {t("dietaryRequirements")}
                        </label>
                        <select
                          name="dietaryRequirement"
                          value={formData.dietaryRequirement}
                          onChange={handleFormChange}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                            boxSizing: "border-box",
                            backgroundColor: "#fff",
                            appearance: "none",
                            backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 10px center",
                            backgroundSize: "16px",
                          }}
                        >
                          <option value="none">{t("dietaryOptions.none")}</option>
                          <option value="vegetarian">{t("dietaryOptions.vegetarian")}</option>
                          <option value="vegan">{t("dietaryOptions.vegan")}</option>
                          <option value="halal">{t("dietaryOptions.halal")}</option>
                          <option value="glutenFree">{t("dietaryOptions.glutenFree")}</option>
                          <option value="allergy">{t("dietaryOptions.allergy")}</option>
                        </select>
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {t("specialNeeds")}
                        </label>
                        <input
                          type="text"
                          name="specialNeeds"
                          value={formData.specialNeeds}
                          onChange={handleFormChange}
                          placeholder={t("specialNeedsPlaceholder")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "14px",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Payment Method */}
                  <div
                    className="checkout-box"
                    style={{
                      marginBottom: "30px",
                      padding: "25px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "15px",
                      }}
                    >
                      <i
                        className="fa-solid fa-credit-card"
                        style={{ color: "#00C853", fontSize: "18px" }}
                      ></i>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        {t("step3")}
                      </h3>
                    </div>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "14px",
                        marginBottom: "20px",
                      }}
                    >
                      {t("paymentMethodLabel")}
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px",
                      }}
                    >
                      <div
                        onClick={() => setPaymentMethod("qr")}
                        style={{
                          padding: "20px",
                          border:
                            paymentMethod === "qr"
                              ? "2px solid #00C853"
                              : "1px solid #ddd",
                          borderRadius: "8px",
                          cursor: "pointer",
                          backgroundColor:
                            paymentMethod === "qr" ? "#f0f9f6" : "#fff",
                          textAlign: "center",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                          📱
                        </div>
                        <h4 style={{ margin: "0 0 5px 0", fontWeight: "600" }}>
                          {t("qrPayment")}
                        </h4>
                        <p
                          style={{ color: "#666", fontSize: "13px", margin: 0 }}
                        >
                          {t("qrPaymentDesc")}
                        </p>
                      </div>

                      <div
                        onClick={() => setPaymentMethod("card")}
                        style={{
                          padding: "20px",
                          border:
                            paymentMethod === "card"
                              ? "2px solid #00C853"
                              : "1px solid #ddd",
                          borderRadius: "8px",
                          cursor: "pointer",
                          backgroundColor:
                            paymentMethod === "card" ? "#f0f9f6" : "#fff",
                          textAlign: "center",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                          💳
                        </div>
                        <h4 style={{ margin: "0 0 5px 0", fontWeight: "600" }}>
                          {t("cardPayment")}
                        </h4>
                        <p
                          style={{ color: "#666", fontSize: "13px", margin: 0 }}
                        >
                          {t("cardPaymentDesc")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <button
                    onClick={handleCheckout}
                    style={{
                      width: "100%",
                      padding: "16px",
                      background:
                        "linear-gradient(135deg, #00C853 0%, #69F0AE 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "opacity 0.3s ease",
                      marginBottom: "15px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.8")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <i className="fa-solid fa-lock"></i> {t("proceedToPayment")}{" "}
                    ({isThai ? "฿" : "$"}
                    {totalPrice})
                  </button>

                  <Link
                    href={`/${locale}/pricing-plan`}
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#00C853",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    ← {t("backToPricing")}
                  </Link>
                </div>

                {/* Right Column - Order Summary */}
                <div className="col-lg-4">
                  <div
                    style={{
                      position: "sticky",
                      top: "20px",
                      padding: "25px",
                      border: "2px solid #00C853",
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <h3
                      style={{
                        marginBottom: "25px",
                        fontSize: "18px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <i className="fa-solid fa-receipt"></i>
                      {t("orderSummary")}
                    </h3>

                    <div
                      style={{
                        marginBottom: "15px",
                        paddingBottom: "15px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 10px 0",
                          fontSize: "12px",
                          color: "#999",
                          fontWeight: "600",
                          textTransform: "uppercase",
                        }}
                      >
                        {t("registration")}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ fontSize: "14px" }}>
                          {t(`packages.${selectedPackage}`)}
                        </span>
                        <span style={{ fontWeight: "600" }}>
                          {isThai ? "฿" : "$"}
                          {isThai
                            ? currentPackage?.priceTHB
                            : currentPackage?.priceUSD}
                        </span>
                      </div>
                    </div>

                    {selectedAddOns.length > 0 && (
                      <div
                        style={{
                          marginBottom: "15px",
                          paddingBottom: "15px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 10px 0",
                            fontSize: "12px",
                            color: "#999",
                            fontWeight: "600",
                            textTransform: "uppercase",
                          }}
                        >
                          {t("addOns")}
                        </p>
                        {addOns
                          .filter((a) => selectedAddOns.includes(a.id))
                          .map((addOn) => (
                            <div
                              key={addOn.id}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "14px",
                                marginBottom: "8px",
                              }}
                            >
                              <span>
                                {t(
                                  addOn.id === "workshop"
                                    ? "preConferenceWorkshop"
                                    : "galaDinner"
                                )}
                              </span>
                              <span style={{ fontWeight: "600" }}>
                                +{isThai ? "฿" : "$"}
                                {isThai ? addOn.priceTHB : addOn.priceUSD}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}

                    <div
                      style={{
                        padding: "15px",
                        backgroundColor: "#f0f9f6",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        textAlign: "center",
                        border: "1px solid #00C853",
                      }}
                    >
                      <p
                        style={{
                          margin: "0 0 8px 0",
                          fontSize: "12px",
                          color: "#666",
                          textTransform: "uppercase",
                        }}
                      >
                        {t("totalAmount")}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "28px",
                          fontWeight: "bold",
                          color: "#00C853",
                        }}
                      >
                        {isThai ? "฿" : "$"}
                        {totalPrice}
                      </p>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#f0f9f6",
                        border: "1px solid #e0f5ed",
                        borderRadius: "6px",
                        padding: "12px",
                        fontSize: "12px",
                        color: "#666",
                        lineHeight: "1.6",
                      }}
                    >
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "#00C853", marginRight: "8px" }}
                      ></i>
                      {t("securePayment")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
