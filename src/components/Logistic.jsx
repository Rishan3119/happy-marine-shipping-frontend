import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import ship from "../images/ship.jpeg";
import cargo from "../images/cargo.png";
import Footer from "./Footer";
import LogosticsNav from "./Navbars/LogosticsNav";
import config from "../function/config";
import axios from "axios";

export default function Logistic() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [ports, setPorts] = useState([]);

  const [selectedRightRegion, setSelectedRightRegion] = useState(null);
  const [selectedRightCountry, setSelectedRightCountry] = useState(null);
  const [rightPorts, setRightPorts] = useState([]);

  const [filteredShips, setFilteredShips] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const regions = {
    Asia: [
      {
        value: "Afghanistan",
        label: "Afghanistan",
        flag: "https://flagcdn.com/w320/af.png",
      },
      {
        value: "Armenia",
        label: "Armenia",
        flag: "https://flagcdn.com/w320/am.png",
      },
      {
        value: "Azerbaijan",
        label: "Azerbaijan",
        flag: "https://flagcdn.com/w320/az.png",
      },
      {
        value: "Bahrain",
        label: "Bahrain",
        flag: "https://flagcdn.com/w320/bh.png",
      },
      {
        value: "Bangladesh",
        label: "Bangladesh",
        flag: "https://flagcdn.com/w320/bd.png",
      },
      {
        value: "Brunei",
        label: "Brunei",
        flag: "https://flagcdn.com/w320/bn.png",
      },
      {
        value: "Cambodia",
        label: "Cambodia",
        flag: "https://flagcdn.com/w320/kh.png",
      },
      {
        value: "China",
        label: "China",
        flag: "https://flagcdn.com/w320/cn.png",
      },
      {
        value: "Cyprus",
        label: "Cyprus",
        flag: "https://flagcdn.com/w320/cy.png",
      },
      {
        value: "Georgia",
        label: "Georgia",
        flag: "https://flagcdn.com/w320/ge.png",
      },
      {
        value: "India",
        label: "India",
        flag: "https://flagcdn.com/w320/in.png",
      },
      {
        value: "Indonesia",
        label: "Indonesia",
        flag: "https://flagcdn.com/w320/id.png",
      },
      { value: "Iran", label: "Iran", flag: "https://flagcdn.com/w320/ir.png" },
      { value: "Iraq", label: "Iraq", flag: "https://flagcdn.com/w320/iq.png" },
      {
        value: "Israel",
        label: "Israel",
        flag: "https://flagcdn.com/w320/il.png",
      },
      {
        value: "Japan",
        label: "Japan",
        flag: "https://flagcdn.com/w320/jp.png",
      },
      {
        value: "Jordan",
        label: "Jordan",
        flag: "https://flagcdn.com/w320/jo.png",
      },
      {
        value: "Kazakhstan",
        label: "Kazakhstan",
        flag: "https://flagcdn.com/w320/kz.png",
      },
      {
        value: "Kuwait",
        label: "Kuwait",
        flag: "https://flagcdn.com/w320/kw.png",
      },
      {
        value: "Kyrgyzstan",
        label: "Kyrgyzstan",
        flag: "https://flagcdn.com/w320/kg.png",
      },
      { value: "Laos", label: "Laos", flag: "https://flagcdn.com/w320/la.png" },
      {
        value: "Lebanon",
        label: "Lebanon",
        flag: "https://flagcdn.com/w320/lb.png",
      },
      {
        value: "Malaysia",
        label: "Malaysia",
        flag: "https://flagcdn.com/w320/my.png",
      },
      {
        value: "Maldives",
        label: "Maldives",
        flag: "https://flagcdn.com/w320/mv.png",
      },
      {
        value: "Mongolia",
        label: "Mongolia",
        flag: "https://flagcdn.com/w320/mn.png",
      },
      {
        value: "Myanmar",
        label: "Myanmar",
        flag: "https://flagcdn.com/w320/mm.png",
      },
      {
        value: "Nepal",
        label: "Nepal",
        flag: "https://flagcdn.com/w320/np.png",
      },
      {
        value: "North Korea",
        label: "North Korea",
        flag: "https://flagcdn.com/w320/kp.png",
      },
      { value: "Oman", label: "Oman", flag: "https://flagcdn.com/w320/om.png" },
      {
        value: "Pakistan",
        label: "Pakistan",
        flag: "https://flagcdn.com/w320/pk.png",
      },
      {
        value: "Palestine",
        label: "Palestine",
        flag: "https://flagcdn.com/w320/ps.png",
      },
      {
        value: "Philippines",
        label: "Philippines",
        flag: "https://flagcdn.com/w320/ph.png",
      },
      {
        value: "Qatar",
        label: "Qatar",
        flag: "https://flagcdn.com/w320/qa.png",
      },
      {
        value: "Russia",
        label: "Russia",
        flag: "https://flagcdn.com/w320/ru.png",
      },
      {
        value: "Saudi Arabia",
        label: "Saudi Arabia",
        flag: "https://flagcdn.com/w320/sa.png",
      },
      {
        value: "Singapore",
        label: "Singapore",
        flag: "https://flagcdn.com/w320/sg.png",
      },
      {
        value: "South Korea",
        label: "South Korea",
        flag: "https://flagcdn.com/w320/kr.png",
      },
      {
        value: "Sri Lanka",
        label: "Sri Lanka",
        flag: "https://flagcdn.com/w320/lk.png",
      },
      {
        value: "Syria",
        label: "Syria",
        flag: "https://flagcdn.com/w320/sy.png",
      },
      {
        value: "Taiwan",
        label: "Taiwan",
        flag: "https://flagcdn.com/w320/tw.png",
      },
      {
        value: "Tajikistan",
        label: "Tajikistan",
        flag: "https://flagcdn.com/w320/tj.png",
      },
      {
        value: "Thailand",
        label: "Thailand",
        flag: "https://flagcdn.com/w320/th.png",
      },
      {
        value: "Timor-Leste",
        label: "Timor-Leste",
        flag: "https://flagcdn.com/w320/tl.png",
      },
      {
        value: "Turkey",
        label: "Turkey",
        flag: "https://flagcdn.com/w320/tr.png",
      },
      {
        value: "Turkmenistan",
        label: "Turkmenistan",
        flag: "https://flagcdn.com/w320/tm.png",
      },
      {
        value: "United Arab Emirates",
        label: "United Arab Emirates",
        flag: "https://flagcdn.com/w320/ae.png",
      },
      {
        value: "Uzbekistan",
        label: "Uzbekistan",
        flag: "https://flagcdn.com/w320/uz.png",
      },
      {
        value: "Vietnam",
        label: "Vietnam",
        flag: "https://flagcdn.com/w320/vn.png",
      },
      {
        value: "Yemen",
        label: "Yemen",
        flag: "https://flagcdn.com/w320/ye.png",
      },
    ],

    Africa: [
      {
        value: "Algeria",
        label: "Algeria",
        flag: "https://flagcdn.com/w320/dz.png",
      },
      {
        value: "Angola",
        label: "Angola",
        flag: "https://flagcdn.com/w320/ao.png",
      },
      {
        value: "Benin",
        label: "Benin",
        flag: "https://flagcdn.com/w320/bj.png",
      },
      {
        value: "Botswana",
        label: "Botswana",
        flag: "https://flagcdn.com/w320/bw.png",
      },
      {
        value: "Burkina Faso",
        label: "Burkina Faso",
        flag: "https://flagcdn.com/w320/bf.png",
      },
      {
        value: "Burundi",
        label: "Burundi",
        flag: "https://flagcdn.com/w320/bi.png",
      },
      {
        value: "Cape Verde",
        label: "Cape Verde",
        flag: "https://flagcdn.com/w320/cv.png",
      },
      {
        value: "Cameroon",
        label: "Cameroon",
        flag: "https://flagcdn.com/w320/cm.png",
      },
      {
        value: "Central African Republic",
        label: "Central African Republic",
        flag: "https://flagcdn.com/w320/cf.png",
      },
      { value: "Chad", label: "Chad", flag: "https://flagcdn.com/w320/td.png" },
      {
        value: "Comoros",
        label: "Comoros",
        flag: "https://flagcdn.com/w320/km.png",
      },
      {
        value: "Congo, Democratic Republic of the",
        label: "Congo, Democratic Republic of the",
        flag: "https://flagcdn.com/w320/cd.png",
      },
      {
        value: "Congo, Republic of the",
        label: "Congo, Republic of the",
        flag: "https://flagcdn.com/w320/cg.png",
      },
      {
        value: "Ivory Coast",
        label: "Ivory Coast",
        flag: "https://flagcdn.com/w320/ci.png",
      },
      {
        value: "Djibouti",
        label: "Djibouti",
        flag: "https://flagcdn.com/w320/dj.png",
      },
      {
        value: "Egypt",
        label: "Egypt",
        flag: "https://flagcdn.com/w320/eg.png",
      },
      {
        value: "Equatorial Guinea",
        label: "Equatorial Guinea",
        flag: "https://flagcdn.com/w320/gq.png",
      },
      {
        value: "Eritrea",
        label: "Eritrea",
        flag: "https://flagcdn.com/w320/er.png",
      },
      {
        value: "Ethiopia",
        label: "Ethiopia",
        flag: "https://flagcdn.com/w320/et.png",
      },
      {
        value: "Gabon",
        label: "Gabon",
        flag: "https://flagcdn.com/w320/ga.png",
      },
      {
        value: "Gambia",
        label: "Gambia",
        flag: "https://flagcdn.com/w320/gm.png",
      },
      {
        value: "Ghana",
        label: "Ghana",
        flag: "https://flagcdn.com/w320/gh.png",
      },
      {
        value: "Guinea",
        label: "Guinea",
        flag: "https://flagcdn.com/w320/gn.png",
      },
      {
        value: "Guinea-Bissau",
        label: "Guinea-Bissau",
        flag: "https://flagcdn.com/w320/gw.png",
      },
      {
        value: "Kenya",
        label: "Kenya",
        flag: "https://flagcdn.com/w320/ke.png",
      },
      {
        value: "Lesotho",
        label: "Lesotho",
        flag: "https://flagcdn.com/w320/ls.png",
      },
      {
        value: "Liberia",
        label: "Liberia",
        flag: "https://flagcdn.com/w320/lr.png",
      },
      {
        value: "Libya",
        label: "Libya",
        flag: "https://flagcdn.com/w320/ly.png",
      },
      {
        value: "Madagascar",
        label: "Madagascar",
        flag: "https://flagcdn.com/w320/mg.png",
      },
      {
        value: "Malawi",
        label: "Malawi",
        flag: "https://flagcdn.com/w320/mw.png",
      },
      { value: "Mali", label: "Mali", flag: "https://flagcdn.com/w320/ml.png" },
      {
        value: "Mauritania",
        label: "Mauritania",
        flag: "https://flagcdn.com/w320/mr.png",
      },
      {
        value: "Mauritius",
        label: "Mauritius",
        flag: "https://flagcdn.com/w320/mu.png",
      },
      {
        value: "Morocco",
        label: "Morocco",
        flag: "https://flagcdn.com/w320/ma.png",
      },
      {
        value: "Mozambique",
        label: "Mozambique",
        flag: "https://flagcdn.com/w320/mz.png",
      },
      {
        value: "Namibia",
        label: "Namibia",
        flag: "https://flagcdn.com/w320/na.png",
      },
      {
        value: "Niger",
        label: "Niger",
        flag: "https://flagcdn.com/w320/ne.png",
      },
      {
        value: "Nigeria",
        label: "Nigeria",
        flag: "https://flagcdn.com/w320/ng.png",
      },
      {
        value: "Rwanda",
        label: "Rwanda",
        flag: "https://flagcdn.com/w320/rw.png",
      },
      {
        value: "Sao Tome and Principe",
        label: "Sao Tome and Principe",
        flag: "https://flagcdn.com/w320/st.png",
      },
      {
        value: "Senegal",
        label: "Senegal",
        flag: "https://flagcdn.com/w320/sn.png",
      },
      {
        value: "Seychelles",
        label: "Seychelles",
        flag: "https://flagcdn.com/w320/sc.png",
      },
      {
        value: "Sierra Leone",
        label: "Sierra Leone",
        flag: "https://flagcdn.com/w320/sl.png",
      },
      {
        value: "Somalia",
        label: "Somalia",
        flag: "https://flagcdn.com/w320/so.png",
      },
      {
        value: "South Africa",
        label: "South Africa",
        flag: "https://flagcdn.com/w320/za.png",
      },
      {
        value: "Sudan",
        label: "Sudan",
        flag: "https://flagcdn.com/w320/sd.png",
      },
      {
        value: "Tanzania",
        label: "Tanzania",
        flag: "https://flagcdn.com/w320/tz.png",
      },
      { value: "Togo", label: "Togo", flag: "https://flagcdn.com/w320/tg.png" },
      {
        value: "Tunisia",
        label: "Tunisia",
        flag: "https://flagcdn.com/w320/tn.png",
      },
      {
        value: "Uganda",
        label: "Uganda",
        flag: "https://flagcdn.com/w320/ug.png",
      },
      {
        value: "Zambia",
        label: "Zambia",
        flag: "https://flagcdn.com/w320/zm.png",
      },
      {
        value: "Zimbabwe",
        label: "Zimbabwe",
        flag: "https://flagcdn.com/w320/zw.png",
      },
    ],
    Europe: [
      {
        value: "Albania",
        label: "Albania",
        flag: "https://flagcdn.com/w320/al.png",
      },
      {
        value: "Andorra",
        label: "Andorra",
        flag: "https://flagcdn.com/w320/ad.png",
      },
      {
        value: "Armenia",
        label: "Armenia",
        flag: "https://flagcdn.com/w320/am.png",
      },
      {
        value: "Austria",
        label: "Austria",
        flag: "https://flagcdn.com/w320/at.png",
      },
      {
        value: "Azerbaijan",
        label: "Azerbaijan",
        flag: "https://flagcdn.com/w320/az.png",
      },
      {
        value: "Belarus",
        label: "Belarus",
        flag: "https://flagcdn.com/w320/by.png",
      },
      {
        value: "Belgium",
        label: "Belgium",
        flag: "https://flagcdn.com/w320/be.png",
      },
      {
        value: "Bosnia and Herzegovina",
        label: "Bosnia and Herzegovina",
        flag: "https://flagcdn.com/w320/ba.png",
      },
      {
        value: "Bulgaria",
        label: "Bulgaria",
        flag: "https://flagcdn.com/w320/bg.png",
      },
      {
        value: "Croatia",
        label: "Croatia",
        flag: "https://flagcdn.com/w320/hr.png",
      },
      {
        value: "Cyprus",
        label: "Cyprus",
        flag: "https://flagcdn.com/w320/cy.png",
      },
      {
        value: "Czech Republic",
        label: "Czech Republic",
        flag: "https://flagcdn.com/w320/cz.png",
      },
      {
        value: "Denmark",
        label: "Denmark",
        flag: "https://flagcdn.com/w320/dk.png",
      },
      {
        value: "Estonia",
        label: "Estonia",
        flag: "https://flagcdn.com/w320/ee.png",
      },
      {
        value: "Finland",
        label: "Finland",
        flag: "https://flagcdn.com/w320/fi.png",
      },
      {
        value: "France",
        label: "France",
        flag: "https://flagcdn.com/w320/fr.png",
      },
      {
        value: "Georgia",
        label: "Georgia",
        flag: "https://flagcdn.com/w320/ge.png",
      },
      {
        value: "Germany",
        label: "Germany",
        flag: "https://flagcdn.com/w320/de.png",
      },
      {
        value: "Greece",
        label: "Greece",
        flag: "https://flagcdn.com/w320/gr.png",
      },
      {
        value: "Hungary",
        label: "Hungary",
        flag: "https://flagcdn.com/w320/hu.png",
      },
      {
        value: "Iceland",
        label: "Iceland",
        flag: "https://flagcdn.com/w320/is.png",
      },
      {
        value: "Ireland",
        label: "Ireland",
        flag: "https://flagcdn.com/w320/ie.png",
      },
      {
        value: "Italy",
        label: "Italy",
        flag: "https://flagcdn.com/w320/it.png",
      },
      {
        value: "Kazakhstan",
        label: "Kazakhstan",
        flag: "https://flagcdn.com/w320/kz.png",
      },
      {
        value: "Kosovo",
        label: "Kosovo",
        flag: "https://flagcdn.com/w320/xk.png",
      },
      {
        value: "Latvia",
        label: "Latvia",
        flag: "https://flagcdn.com/w320/lv.png",
      },
      {
        value: "Liechtenstein",
        label: "Liechtenstein",
        flag: "https://flagcdn.com/w320/li.png",
      },
      {
        value: "Lithuania",
        label: "Lithuania",
        flag: "https://flagcdn.com/w320/lt.png",
      },
      {
        value: "Luxembourg",
        label: "Luxembourg",
        flag: "https://flagcdn.com/w320/lu.png",
      },
      {
        value: "Malta",
        label: "Malta",
        flag: "https://flagcdn.com/w320/mt.png",
      },
      {
        value: "Moldova",
        label: "Moldova",
        flag: "https://flagcdn.com/w320/md.png",
      },
      {
        value: "Monaco",
        label: "Monaco",
        flag: "https://flagcdn.com/w320/mc.png",
      },
      {
        value: "Montenegro",
        label: "Montenegro",
        flag: "https://flagcdn.com/w320/me.png",
      },
      {
        value: "Netherlands",
        label: "Netherlands",
        flag: "https://flagcdn.com/w320/nl.png",
      },
      {
        value: "North Macedonia",
        label: "North Macedonia",
        flag: "https://flagcdn.com/w320/mk.png",
      },
      {
        value: "Norway",
        label: "Norway",
        flag: "https://flagcdn.com/w320/no.png",
      },
      {
        value: "Poland",
        label: "Poland",
        flag: "https://flagcdn.com/w320/pl.png",
      },
      {
        value: "Portugal",
        label: "Portugal",
        flag: "https://flagcdn.com/w320/pt.png",
      },
      {
        value: "Romania",
        label: "Romania",
        flag: "https://flagcdn.com/w320/ro.png",
      },
      {
        value: "Russia",
        label: "Russia",
        flag: "https://flagcdn.com/w320/ru.png",
      },
      {
        value: "San Marino",
        label: "San Marino",
        flag: "https://flagcdn.com/w320/sm.png",
      },
      {
        value: "Serbia",
        label: "Serbia",
        flag: "https://flagcdn.com/w320/rs.png",
      },
      {
        value: "Slovakia",
        label: "Slovakia",
        flag: "https://flagcdn.com/w320/sk.png",
      },
      {
        value: "Slovenia",
        label: "Slovenia",
        flag: "https://flagcdn.com/w320/si.png",
      },
      {
        value: "Spain",
        label: "Spain",
        flag: "https://flagcdn.com/w320/es.png",
      },
      {
        value: "Sweden",
        label: "Sweden",
        flag: "https://flagcdn.com/w320/se.png",
      },
      {
        value: "Switzerland",
        label: "Switzerland",
        flag: "https://flagcdn.com/w320/ch.png",
      },
      {
        value: "Turkey",
        label: "Turkey",
        flag: "https://flagcdn.com/w320/tr.png",
      },
      {
        value: "Ukraine",
        label: "Ukraine",
        flag: "https://flagcdn.com/w320/ua.png",
      },
      {
        value: "United Kingdom",
        label: "United Kingdom",
        flag: "https://flagcdn.com/w320/gb.png",
      },
      {
        value: "Vatican City",
        label: "Vatican City",
        flag: "https://flagcdn.com/w320/va.png",
      },
    ],
    America: [
      {
        value: "Antigua and Barbuda",
        label: "Antigua and Barbuda",
        flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Antigua_and_Barbuda.svg/1200px-Flag_of_Antigua_and_Barbuda.svg.png",
      },
      {
        value: "Argentina",
        label: "Argentina",
        flag: "https://flagcdn.com/w320/ar.png",
      },
      {
        value: "Aruba",
        label: "Aruba",
        flag: "https://flagcdn.com/w320/aw.png",
      },
      {
        value: "Bahamas",
        label: "Bahamas",
        flag: "https://flagcdn.com/w320/bs.png",
      },
      {
        value: "Barbados",
        label: "Barbados",
        flag: "https://flagcdn.com/w320/bb.png",
      },
      {
        value: "Belize",
        label: "Belize",
        flag: "https://flagcdn.com/w320/bz.png",
      },
      {
        value: "Bermuda",
        label: "Bermuda",
        flag: "https://flagcdn.com/w320/bm.png",
      },
      {
        value: "Bolivia",
        label: "Bolivia",
        flag: "https://flagcdn.com/w320/bo.png",
      },
      {
        value: "Brazil",
        label: "Brazil",
        flag: "https://flagcdn.com/w320/br.png",
      },
      {
        value: "British Virgin Islands",
        label: "British Virgin Islands",
        flag: "https://flagcdn.com/w320/vg.png",
      },
      {
        value: "Canada",
        label: "Canada",
        flag: "https://flagcdn.com/w320/ca.png",
      },
      {
        value: "Cayman Islands",
        label: "Cayman Islands",
        flag: "https://flagcdn.com/w320/ky.png",
      },
      {
        value: "Chile",
        label: "Chile",
        flag: "https://flagcdn.com/w320/cl.png",
      },
      {
        value: "Colombia",
        label: "Colombia",
        flag: "https://flagcdn.com/w320/co.png",
      },
      {
        value: "Costa Rica",
        label: "Costa Rica",
        flag: "https://flagcdn.com/w320/cr.png",
      },
      {
        value: "Cuba",
        label: "Cuba",
        flag: "https://flagcdn.com/w320/cu.png",
      },
      {
        value: "Curacao",
        label: "Curacao",
        flag: "https://flagcdn.com/w320/cw.png",
      },
      {
        value: "Dominica",
        label: "Dominica",
        flag: "https://flagcdn.com/w320/dm.png",
      },
      {
        value: "Dominican Republic",
        label: "Dominican Republic",
        flag: "https://flagcdn.com/w320/do.png",
      },
      {
        value: "Ecuador",
        label: "Ecuador",
        flag: "https://flagcdn.com/w320/ec.png",
      },
      {
        value: "El Salvador",
        label: "El Salvador",
        flag: "https://flagcdn.com/w320/sv.png",
      },
      {
        value: "Grenada",
        label: "Grenada",
        flag: "https://flagcdn.com/w320/gd.png",
      },
      {
        value: "Guatemala",
        label: "Guatemala",
        flag: "https://flagcdn.com/w320/gt.png",
      },
      {
        value: "Guyana",
        label: "Guyana",
        flag: "https://flagcdn.com/w320/gy.png",
      },
      {
        value: "Haiti",
        label: "Haiti",
        flag: "https://flagcdn.com/w320/ht.png",
      },
      {
        value: "Honduras",
        label: "Honduras",
        flag: "https://flagcdn.com/w320/hn.png",
      },
      {
        value: "Jamaica",
        label: "Jamaica",
        flag: "https://flagcdn.com/w320/jm.png",
      },
      {
        value: "Mexico",
        label: "Mexico",
        flag: "https://flagcdn.com/w320/mx.png",
      },
      {
        value: "Nicaragua",
        label: "Nicaragua",
        flag: "https://flagcdn.com/w320/ni.png",
      },
      {
        value: "Panama",
        label: "Panama",
        flag: "https://flagcdn.com/w320/pa.png",
      },
      {
        value: "Paraguay",
        label: "Paraguay",
        flag: "https://flagcdn.com/w320/py.png",
      },
      {
        value: "Peru",
        label: "Peru",
        flag: "https://flagcdn.com/w320/pe.png",
      },
      {
        value: "Puerto Rico",
        label: "Puerto Rico",
        flag: "https://flagcdn.com/w320/pr.png",
      },
      {
        value: "Saint Kitts and Nevis",
        label: "Saint Kitts and Nevis",
        flag: "https://flagcdn.com/w320/kn.png",
      },
      {
        value: "Saint Lucia",
        label: "Saint Lucia",
        flag: "https://flagcdn.com/w320/lc.png",
      },
      {
        value: "Saint Martin (French part)",
        label: "Saint Martin (French part)",
        flag: "https://flagcdn.com/w320/sx.png",
      },
      {
        value: "Saint Vincent and the Grenadines",
        label: "Saint Vincent and the Grenadines",
        flag: "https://flagcdn.com/w320/vc.png",
      },
      {
        value: "Sint Maarten (Dutch part)",
        label: "Sint Maarten (Dutch part)",
        flag: "https://flagcdn.com/w320/sx.png",
      },
      {
        value: "Suriname",
        label: "Suriname",
        flag: "https://flagcdn.com/w320/sr.png",
      },
      {
        value: "Trinidad and Tobago",
        label: "Trinidad and Tobago",
        flag: "https://flagcdn.com/w320/tt.png",
      },
      {
        value: "Turks and Caicos Islands",
        label: "Turks and Caicos Islands",
        flag: "https://flagcdn.com/w320/tc.png",
      },
      {
        value: "United States",
        label: "United States",
        flag: "https://flagcdn.com/w320/us.png",
      },
      {
        value: "United States Virgin Islands",
        label: "United States Virgin Islands",
        flag: "https://flagcdn.com/w320/vi.png",
      },
      {
        value: "Uruguay",
        label: "Uruguay",
        flag: "https://flagcdn.com/w320/uy.png",
      },
      {
        value: "Venezuela",
        label: "Venezuela",
        flag: "https://flagcdn.com/w320/ve.png",
      },
    ],
    Continental: [
      {
        value: "American Samoa",
        label: "American Samoa",
        flag: "https://flagcdn.com/w320/as.png",
      },
      {
        value: "Australia",
        label: "Australia",
        flag: "https://flagcdn.com/w320/au.png",
      },
      {
        value: "Christmas Island",
        label: "Christmas Island",
        flag: "https://flagcdn.com/w320/cx.png",
      },
      {
        value: "Cook Islands",
        label: "Cook Islands",
        flag: "https://flagcdn.com/w320/ck.png",
      },
      {
        value: "Fiji",
        label: "Fiji",
        flag: "https://flagcdn.com/w320/fj.png",
      },
      {
        value: "French Polynesia",
        label: "French Polynesia",
        flag: "https://flagcdn.com/w320/pf.png",
      },
      {
        value: "Guam",
        label: "Guam",
        flag: "https://flagcdn.com/w320/gu.png",
      },
      {
        value: "Kiribati",
        label: "Kiribati",
        flag: "https://flagcdn.com/w320/ki.png",
      },
      {
        value: "Marshall Islands",
        label: "Marshall Islands",
        flag: "https://flagcdn.com/w320/mh.png",
      },
      {
        value: "Micronesia",
        label: "Micronesia",
        flag: "https://flagcdn.com/w320/fm.png",
      },
      {
        value: "Nauru",
        label: "Nauru",
        flag: "https://flagcdn.com/w320/nr.png",
      },
      {
        value: "New Caledonia",
        label: "New Caledonia",
        flag: "https://flagcdn.com/w320/nc.png",
      },
      {
        value: "New Zealand",
        label: "New Zealand",
        flag: "https://flagcdn.com/w320/nz.png",
      },
      {
        value: "Niue",
        label: "Niue",
        flag: "https://flagcdn.com/w320/nu.png",
      },
      {
        value: "Norfolk Island",
        label: "Norfolk Island",
        flag: "https://flagcdn.com/w320/nf.png",
      },
      {
        value: "Northern Mariana Islands",
        label: "Northern Mariana Islands",
        flag: "https://flagcdn.com/w320/mp.png",
      },
      {
        value: "Palau",
        label: "Palau",
        flag: "https://flagcdn.com/w320/pw.png",
      },
      {
        value: "Papua New Guinea",
        label: "Papua New Guinea",
        flag: "https://flagcdn.com/w320/pg.png",
      },
      {
        value: "Pitcairn Islands",
        label: "Pitcairn Islands",
        flag: "https://flagcdn.com/w320/pn.png",
      },
      {
        value: "Samoa",
        label: "Samoa",
        flag: "https://flagcdn.com/w320/ws.png",
      },
      {
        value: "Solomon Islands",
        label: "Solomon Islands",
        flag: "https://flagcdn.com/w320/sb.png",
      },
      {
        value: "Tonga",
        label: "Tonga",
        flag: "https://flagcdn.com/w320/to.png",
      },
      {
        value: "Tuvalu",
        label: "Tuvalu",
        flag: "https://flagcdn.com/w320/tv.png",
      },
      {
        value: "Vanuatu",
        label: "Vanuatu",
        flag: "https://flagcdn.com/w320/vu.png",
      },
      {
        value: "Wallis and Futuna",
        label: "Wallis and Futuna",
        flag: "https://flagcdn.com/w320/wf.png",
      },
    ],
  };

  const portsData = {
    // continental
    "American Samoa": ["Pago Pago (ASPPG)"],
    Australia: [
      "Abbot Point",
      "Adelaide",
      "Albany",
      "Ball’s Head",
      "Ballast Point",
      "Balmain",
      "Barney Point",
      "Barrow Island",
      "Beauty Point Harbour",
      "Bell Bay",
      "Berry’s Bay",
      "Blackwattle Bay",
      "Boston Bay",
      "Botany Bay",
      "Bowen",
      "Brisbane",
      "Bunbury",
      "Bundaberg",
      "Burnie",
      "Cairns",
      "Carnarvon",
      "Cooktown",
      "Cossack Pioneer Terminal",
      "Crib Point",
      "Dalrymple Bay",
      "Dampier",
      "Darling Harbour",
      "Darwin",
      "Devonport",
      "East Intercourse Island",
      "Eden",
      "Emu Bay",
      "Esperance",
      "Finucane Island",
      "Fisherman Islands",
      "Fremantle",
      "Geelong",
      "George Town",
      "Geraldton",
      "Gladstone",
      "Glebe Island",
      "Gore Bay",
      "Gove",
      "Groote Eylandt",
      "Hastings",
      "Hay Point",
      "Hobart",
      "Humbug Point",
      "Koolan Island",
      "Kurnell",
      "Kwinana",
      "Launceston",
      "Long Island Point",
      "Long Reach",
      "Lorim Point",
      "Mackay",
      "Macquarie Point",
      "Melbourne",
      "Milner Bay",
      "Mistaken Island",
      "Munganno Point",
      "Nelson Point",
      "Newcastle",
      "Parker Point",
      "Perth",
      "Pinkenba",
      "Port Alma",
      "Port Augusta",
      "Port Botany",
      "Port Hedland",
      "Port Jackson",
      "Port Kembla",
      "Port Kennedy",
      "Port Latta",
      "Port Lincoln",
      "Port Pirie",
      "Port Stanvac",
      "Port Walcott",
      "Porter Bay",
      "Portland",
      "Princess Royal Harbour",
      "Proper Bay",
      "Pyrmont",
      "Risdon",
      "Rockhampton",
      "Self’s Point",
      "Snail’s Bay",
      "Snug Cove",
      "Spalding Cove",
      "Stanley",
      "Sydney",
      "Sydney Cove",
      "Thursday Island",
      "Townsville",
      "Trial Bay",
      "Twofold Bay",
      "Urangan",
      "Wallaroo",
      "Weipa",
      "Western Port",
      "White Bay",
      "Whyalla",
      "Withnell Bay",
      "Wyndham",
      "Yampi Sound",
    ],
    "Christmas Island": ["Christmas Island"],
    "Cook Islands": ["Rarotonga (CKRAR)"],
    Fiji: ["Lautoka", "Suva", "Walu Bay"],
    "French Polynesia": ["Papeete"],
    Guam: ["Apra Harbour"],
    Kiribati: ["Banaba"],
    " Marshall Islands": ["Kwajalein", "Majuro"],
    Micronesia: ["Tomil Harbour", "Yap Colonia International Port"],
    Nauru: ["Nauru"],
    "New Caledonia": [
      "Baie de Numbo",
      "Baie des Dames",
      "Kouaoua",
      "Noumea",
      "Poro",
      "Thio",
    ],
    "New Zealand": [
      "Auckland",
      "Bluff",
      "Christchurch",
      "Dunedin",
      "Eastland Port",
      "Gisborne",
      "Lyttelton",
      "Marsden Point",
      "Napier",
      "Nelson",
      "New Plymouth",
      "Otago Harbour",
      "Picton",
      "Port Chalmers",
      "Port Marlborough",
      "Port Taranaki",
      "Ravensbourne",
      "Tauranga",
      "Timaru",
      "Wanganui",
      "Wellington",
      "Whangarei",
    ],
    Niue: ["Alofi"],
    "Norfolk Island": ["Kingston"],
    "Northern Mariana Islands": ["Saipan"],
    Palau: ["Port of Malakal"],
    "Papua New Guinea": ["Lae", "Lorengau", "Madang", "Port Moresby", "Rabaul"],
    "Pitcairn Islands": ["Adamstown"],
    Samoa: ["Apia"],
    "Solomon Islands": ["Honiara", "Point Cruz"],
    Tonga: ["Nukualofa"],
    Tuvalu: ["Funafuti"],
    Vanuatu: ["Port Vila", "Santo"],
    "Wallis and Futuna": ["Futuna Island", "Mata'utu"],
    // America
    "Antigua and Barbuda": ["St. John’s"],
    Argentina: [
      "Bahia Blanca",
      "Buenos Aires",
      "Caleta Cordova",
      "Caleta Olivares",
      "Caleta Olivia",
      "Campana",
      "Comodoro Rivadavia",
      "Diamante",
      "General Lagos",
      "Ibicuy",
      "Ingeniero Buitrango",
      "Ingeniero White",
      "La Plata",
      "Puerto Acevedo",
      "Puerto Belgrano",
      "Puerto Galvan",
      "Puerto Ingeniero Rocca",
      "Puerto Madryn",
      "Puerto Martins",
      "Puerto Parana",
      "Puerto Rosales",
      "Punta Alvear",
      "Punta Ancla",
      "Punta Ciguena",
      "Punta Loyola",
      "Ramallo",
      "Rio Gallegos",
      "Rosario",
      "San Lorenzo – San Martin",
      "San Martin",
      "San Nicolas",
      "San Pedro",
      "San Sebastian Bay",
      "Santa Fe",
      "Villa Constitucion",
      "Zarate",
    ],
    Aruba: ["Barcadera", "Oranjestad", "San Nicolas"],
    Bahamas: ["Clifton Point", "Freeport", "Nassau"],
    Barbados: [
      "Black Rock Tanker Terminal",
      "Bridgetown",
      "Needham’s Point Tanker Terminal",
      "Oistins Bay Tanker Terminal",
      "Spring Garden Tanker Terminal",
    ],
    Belize: ["Belize City"],
    Bermuda: ["Freeport", "Hamilton"],
    Bolivia: ["Cochabamba", "San Pedro", "SANTA CRUZ"],
    Brazil: [
      "Admiral Barroso Terminal",
      "Alemoa Terminal",
      "Antonina",
      "Aracaju",
      "Aratu",
      "Barao De Teffe",
      "Barnabe Island Terminal",
      "Belem",
      "Butadiene Dock Island",
      "Cabedelo",
      "Conceicaozinha Terminal",
      "Cosipa Terminal",
      "Cutrale Terminal",
      "DTSE/GEGAU Oil Terminal",
      "Fortaleza",
      "Governor’s Island",
      "Ilha Redonda",
      "Itaqui",
      "Maceio",
      "Madre Deus",
      "Manaus",
      "Miramar Oil Terminal",
      "Mucuripe",
      "Natal",
      "Niteroi",
      "Paranagua",
      "Ponta da Madeira",
      "Porto Alegre",
      "Praia Mole",
      "Recife",
      "Redonda Island",
      "Rio de Janeiro",
      "Rio Grande",
      "Salvador",
      "Santos",
      "Sao Cristovao",
      "Sao Luis",
      "Sao Sebastiao",
      "Torgua",
      "Tiramandai",
      "Tubarao",
      "Ultrafertil Terminal",
      "Vitoria",
    ],
    "British Virgin Islands": [
      "Charlotte Amalie",
      "Road Harbour",
      "Tortola",
      "Virgin Gorda",
    ],
    Canada: [
      "Argentina",
      "Baie Verte",
      "Baie-Comeau",
      "Bathurst",
      "Bayside",
      "Belledune",
      "Berrypoint",
      "Botwood",
      "Brooklyn",
      "Burlington Bay",
      "Campbell River",
      "Canaport",
      "Chandler",
      "Charlottetown",
      "Chatham",
      "Chicoutimi",
      "Churchill",
      "Clarenville",
      "Clarkson",
      "Come By Chance",
      "Comeau Bay",
      "Corner Brook",
      "Dalhousie",
      "Duke Point",
      "Duncan Bay",
      "Esquimalt",
      "Fairview Cove",
      "Frobisher",
      "Gold River",
      "Goose Bay",
      "Halifax",
      "Hamilton",
      "Havre St Pierre",
      "Holyrood",
      "Humbermouth",
      "Iqaluit",
      "Kingston",
      "Kingsville",
      "Kitimat",
      "Lewisporte",
      "Liverpool",
      "Long Harbour",
      "Matane",
      "Mckellar Island",
      "Middle Point",
      "Mission River",
      "Mont Louis",
      "Montreal",
      "Mulgrave",
      "Nanaimo",
      "New Glasgow & Trenton",
      "New Richmond",
      "Newcastle",
      "North Sydney",
      "Ocean Falls",
      "Ogden Point",
      "Pictou",
      "Point Tupper",
      "Pointe Aux Basques",
      "Pointe Noire",
      "Port Alberni",
      "Port Alfred",
      "Port Alice",
      "Port aux Basques",
      "Port Cartier",
      "Port Harmon",
      "Port Hawkesbury",
      "Port Medway",
      "Port Saguenay",
      "Port Stanley",
      "Powell River",
      "Prince Rupert",
      "Quebec",
      "Ridley Island",
      "Rimouski",
      "Roberts Bank",
      "Saint John",
      "Sarnia",
      "Sept-Iles",
      "Seven Islands",
      "Shelburne",
      "Sorel",
      "St Andrews",
      "St John’s",
      "St Romuald",
      "Stephenville",
      "Stewart",
      "Sydney",
      "Tahsis",
      "Thunder Bay",
      "Toronto",
      "Trois-Rivieres",
      "Vancouver",
      "Victoria",
      "Whiffen Head",
      "Windsor",
      "Yarmouth",
    ],
    "Cayman Islands": ["Georgetown"],
    Chile: [
      "Antofagasta",
      "Arica",
      "Barquito",
      "Cabo Negro",
      "Calbuco",
      "Caldera",
      "Caleta Clarencia",
      "Caleta Coloso",
      "Caleta Ossa",
      "Chanaral",
      "Coquimbo",
      "Corralle",
      "Cutter Cove",
      "Gregorio",
      "Guacolda",
      "Guayacan",
      "Huasco",
      "Iquique",
      "La Chimba Cove",
      "Laredo",
      "Las Losas",
      "Las Salinas",
      "Lenadura",
      "Lirquen",
      "Pecket",
      "Porvenir",
      "Puerto Coralle",
      "Puerto Corral",
      "Puerto Montt",
      "Puerto Percy",
      "Puerto Ventanas",
      "Punta Arenas",
      "Quintero",
      "San Antonio",
      "San Gregorio",
      "San Vicente",
      "Santa Barbara",
      "Talcahuano",
      "Taltal",
      "Tocopilla",
      "Valdivia",
      "Valparaiso",
    ],
    Colombia: [
      "Barranquilla",
      "Buenaventura",
      "Cartagena",
      "Cienaga",
      "Covenas Offshore Terminal",
      "Ecopetrol",
      "Mamonal",
      "Monomeros",
      "Muelles El Bosque",
      "Pindo",
      "Pozos Colorados",
      "Puerto Prodeco",
      "Puerto Zuniga",
      "Santa Marta",
      "Tolu",
      "Tumaco",
    ],
    "Costa Rica": [
      "Golfito",
      "Golfo Dulce",
      "Puerto Limon",
      "Puerto Moin",
      "Puntarenas",
      "Quepos",
    ],
    Cuba: [
      "Antilla",
      "Banes",
      "Caibarien",
      "Cardenas",
      "Casilda",
      "Cayo Frances",
      "Cienfuegos",
      "Felton",
      "Guantanamo",
      "Havana",
      "Macabi",
      "Manzanillo",
      "Mariel",
      "Matanzas",
      "Nuevitas",
      "Pastelillo",
      "Preston",
      "Puerto Padre",
      "Puerto Tarafa",
      "Santiago de Cuba",
      "Tarafa",
    ],
    Curacao: ["Willemstad"],
    Dominica: ["Roseau", "Woodbridge Bay"],
    "Dominican Republic": [
      "Barahona",
      "Cabo Rojo",
      "Ciudad Trujillo",
      "La Romana",
      "Manzanillo",
      "San Pedro de Macoris",
      "Sans Souci",
      "Santo Domingo",
    ],
    Ecuador: [
      "Andiport",
      "Balao Terminal",
      "Esmeraldas",
      "Guayaquil",
      "La Libertad",
      "Tepre Terminal",
    ],
    "El Salvador": [
      "Acajutla",
      "Acajutla Offshore Terminal",
      "Cutuco",
      "La Union",
    ],
    Grenada: [
      "Grand Mal Tanker Terminal",
      "Queen’s Park Tanker Terminal",
      "St George’s",
    ],
    Guatemala: [
      "Puerto Barrios",
      "Puerto Quetzal",
      "San Jose",
      "Santo Tomas de Castilla",
    ],
    Guyana: ["Georgetown"],
    Haiti: ["Port au Prince"],
    Honduras: ["La Ceiba", "Tela"],
    Jamaica: [
      "Kingston",
      "Port Bustamente",
      "Port Esquivel",
      "Port Royal",
      "Salt River",
    ],
    Mexico: [
      "Cedros Island",
      "Coatzacoalcos",
      "Ensenada",
      "Guaymas",
      "Manzanillo",
      "Mazatlan",
      "Minatitlan",
      "Morro Redondo",
      "Nanchital",
      "Pajaritos",
      "Rosarito Terminal",
      "Salina Cruz",
      "San Pedrito Port",
      "Tampico",
      "Tuxpan",
      "Veracruz",
    ],
    Nicaragua: ["Corinto", "Puerto Sandino"],
    Panama: [
      "Almirante",
      "Bahia Las Minas",
      "Balboa",
      "Coco Solo North",
      "Colon",
      "Cristobal",
      "Las Minas Bay",
      "Manzanillo International Terminal",
      "Rodman Naval Station",
    ],
    Paraguay: ["Asuncion"],
    Peru: [
      "Cabo Blanco",
      "Callao",
      "Chimbote",
      "Coishco",
      "General San Martin",
      "Ilo",
      "La Pampilla",
      "Lobitos",
      "Matarani",
      "Mollendo",
      "Pacasmayo",
      "Paramonga",
      "Pimentel",
      "Pisco",
      "Salaverry",
      "San Nicolas",
      "Supe",
      "Talara",
    ],
    "Puerto Rico": [
      "Guanica",
      "Guayanilla",
      "Las Mareas",
      "Mayaguez",
      "Ponce",
      "Porto Nuevo",
      "San Juan",
    ],
    "Saint Kitts and Nevis": ["Basseterre", "Charlestown"],
    "Saint Lucia": ["Castries", "Cul De Sac", "Port Castries", "Vieux Fort"],
    "Saint Martin (French part)": ["Galisbay Port"],
    "Saint Vincent and the Grenadines": [
      "Campden Park",
      "Georgetown",
      "Kingstown",
      "Kingstown",
      "St Vincent",
    ],
    "Sint Maarten (Dutch part)": ["Philipsburg"],
    Suriname: ["Paramaribo"],
    "Trinidad and Tobago": [
      "Brighton",
      "Point Fortin",
      "Port of Spain",
      "Tembladora",
    ],
    "Turks and Caicos Islands": [
      "Cockburn Harbour",
      "Grand Turk",
      "Providenciales",
    ],
    "United States": [
      "Aberdeen",
      "Alabama Inland Ports",
      "Albany",
      "Alliance",
      "Anacortes",
      "Anchorage",
      "Astoria",
      "Atreco",
      "Avon",
      "Avondale",
      "Baltimore",
      "Bangor",
      "Barbours Cut",
      "Baton Rouge",
      "Bayonne",
      "Bayport",
      "Baytown",
      "Beaumont",
      "Benicia",
      "Big Bend",
      "Black Rock Harbour",
      "Blount Island",
      "Boca Grande",
      "Boggy Bayou",
      "Boston",
      "Brabazos",
      "Brayton Point",
      "Bridgeport",
      "Bristol Harbor",
      "Brownsville",
      "Bucksport",
      "Buffalo",
      "Burlington",
      "Burnside",
      "Calumet",
      "Camden",
      "Cape Cod Canal",
      "Chalmette",
      "Charleston",
      "Chelsea",
      "Chesapeake",
      "Chester",
      "Chicago",
      "Cleveland",
      "Columbia",
      "Columbia/Snake River System",
      "Commodore’s Point",
      "Coos Bay",
      "Cordova",
      "Corpus Christi",
      "Crockett",
      "Dames Point",
      "Deer Park",
      "Delaware City",
      "Demopolis",
      "Detroit",
      "Dodge Island",
      "Donaldsonville",
      "Drift River Marine Terminal",
      "Duluth-Superior",
      "Dundalk",
      "Dutch Harbor",
      "East Bay",
      "Eddystone",
      "El Segundo Terminal",
      "Elizabeth",
      "Eufaula",
      "Eureka",
      "Everett",
      "Everglades",
      "Fairport Harbor",
      "Fall River",
      "Ferndale",
      "Fort Lauderdale",
      "Fort Pierce",
      "Freeport",
      "Galena Park",
      "Galveston",
      "Geismar",
      "Girard Point",
      "Grays Harbor",
      "Greens Bayou",
      "Greenwich Point",
      "Gretna",
      "Groton",
      "Gulfport",
      "Haines",
      "Hampton Roads",
      "Hawkins Point",
      "Hercules",
      "Hillsborough Bay",
      "Hilo",
      "Honolulu",
      "Hoquiam",
      "Houston",
      "Humboldt Bay",
      "Jacintoport",
      "Jacksonville",
      "Jeffries Point",
      "Juneau",
      "Key West",
      "Kodiak",
      "Lake Calumet Harbor",
      "Lake Charles",
      "Lemont",
      "Locust Point",
      "Long Beach",
      "Los Angeles",
      "Lummus Island",
      "Manchester",
      "March Point",
      "Marcus Hook",
      "Mare Island",
      "Marrero",
      "Martinez",
      "McDuffie Island",
      "Melville",
      "Meraux",
      "Miami",
      "Milwaukee",
      "Mobile",
      "Montgomery",
      "Morehead City",
      "National City",
      "Nederland",
      "New Bedford",
      "New Haven",
      "New Jersey",
      "New London",
      "New Orleans",
      "New York & New Jersey",
      "Newark",
      "Newport (Rhode Island)",
      "Newport News",
      "Nikiski",
      "Nome",
      "Norfolk",
      "North Kingstown",
      "Northport",
      "Northville",
      "Oleum",
      "Orange",
      "Ozol",
      "Palm Beach",
      "Panama City",
      "Pasadena",
      "Paulsboro",
      "Penns Grove",
      "Pennsauken",
      "Pensacola",
      "Perth Amboy",
      "Philadelphia",
      "Phoenix City",
      "Piney Point",
      "Pittsburg",
      "Port Arthur",
      "Port Canaveral",
      "Port Chester Harbor",
      "Port Covington",
      "Port Everglades",
      "Port Huron",
      "Port Isabel",
      "Port Jefferson",
      "Port Manatee",
      "Port Neches",
      "Port Newark",
      "Port Richmond",
      "Port San Luis",
      "Port St Joe",
      "Port Sutton",
      "Port Townsend",
      "Portland (Maine)",
      "Portland (Oregon)",
      "Portsmouth",
      "Portsmouth (New Hampshire)",
      "Providence",
      "Rattlesnake",
      "Revere",
      "Richmond (Virginia)",
      "Riverhead Terminal",
      "Rockport",
      "Sabine",
      "Salem",
      "San Diego",
      "San Francisco",
      "San Pedro Harbor",
      "Sandwich",
      "Santa Barbara",
      "Savannah",
      "Searsport",
      "Seattle",
      "Selby",
      "Selma",
      "Seward",
      "Stika",
      "Skagway",
      "Smith’s Bluff",
      "South Locust Point",
      "Sparrow’s Point",
      "St Bernard Port",
      "St Petersburg",
      "Stamford Harbor",
      "Stockton",
      "Superior",
      "Tacoma",
      "Tampa",
      "Texas City",
      "Texport",
      "Three Mile Creek",
      "Tiverton",
      "Tuscaloosa",
      "Unalaska",
      "Valdez",
      "Vallejo",
      "Vancouver",
      "Weedon Island",
      "West Wego",
      "Whittier",
      "Wilmington (Delaware)",
      "Wilmington (North Carolina)",
      "Winterport",
      "Yorktown",
    ],
    "United States Virgin Islands": [
      "Charlotte Amalie",
      "Christiansted",
      "St. Croix",
      "Limetree Bay",
      "Port Alucroix",
      "Saint John",
      "Third Port",
    ],
    Uruguay: [
      "Colonia",
      "Fray Bentos",
      "Jose Ignacio Terminal",
      "La Paloma",
      "Montevideo",
      "Punta del Este",
    ],
    Venezuela: [
      "Alcasa",
      "Amuay",
      "Araya",
      "Bajo Grande Refinery",
      "Boca Grande",
      "Borburata",
      "Cabimas/Maracaibo L",
      "Carupano",
      "Chichiriviche",
      "Ciudad Bolivar",
      "Coloncha",
      "Cristobal Colon",
      "Cumana",
      "El Chaure",
      "El Guamache",
      "El Palito",
      "El Tablazo/Maracaibo",
      "Guanta",
      "Guaraguao",
      "Guaranao Bay",
      "Guiria",
      "Jose Terminal",
      "La Ceiba",
      "La Estacada",
      "La Guaira",
      "Maracaibo",
      "Matanzas",
      "Palua",
      "Pamatacual",
      "Paradero",
      "Pertigalete",
      "Puerto Cabello",
      "Puerto de Hierro",
      "Puerto Pedernales",
      "Puerto Sucre",
      "Punta Camacho",
      "Punta Cardon",
      "Punta Cuchillo",
      "Punta de Palmas",
      "San Felix",
      "San Lorenzo",
      "Venalum Terminal",
      "Venterminales",
    ],

    // asia
    Afghanistan: ["Kabul"],
    Armenia: ["Aragatsotn", "Ararat", "Rind", "Spitak"],
    Azerbaijan: ["Baku"],
    Bahrain: ["Mina Salman", "Sitra"],
    Bangladesh: ["Chalna", "Chittagong", "Khulna", "Mongla"],
    Brunei: [
      "Kuala Belait",
      "Lumut",
      "Muara",
      "Muara Harbour",
      "Seria",
      "Tanjong Salirontanjo",
    ],
    Cambodia: ["Kampong Saom", "Phnom Penh", "Sihanoukville"],
    China: [
      "Amoy",
      "Baoshan",
      "Bayuquan",
      "Beigang",
      "Canton",
      "Chefoo",
      "Chinwangtao",
      "Dagang",
      "Dairen",
      "Dalian",
      "Dayao Bay",
      "Dongdu",
      "Foochow",
      "Fuzhou",
      "Ganjingzi",
      "Guangzhou",
      "Handi",
      "Hankow",
      "Heizuizi",
      "Heshangdao",
      "Hong Kong",
      "Huangdao",
      "Huangpu",
      "Nanjing",
      "Nianyuwan",
      "Qianwan",
      "Qingdao",
      "Qinhuangdao",
      "Shanghai",
      "Shantou",
      "Siergou",
      "Swatow",
      "Taku Bar",
      "Tanggu",
      "Tianjin",
      "Tsamkong",
      "Tsingtao",
      "Wei Hai",
      "Wuhan",
      "Xiahai",
      "Xiamen",
      "Xianglujiao",
      "Xidi",
      "Xigang",
      "Xingang",
      "Xinshenwei",
      "Yantai",
      "Yingkou",
      "Zhanjiang",
      "Zhonggang",
    ],
    Cyprus: [
      "Akrotiri",
      "Dhekelia",
      "Famagusta",
      "Gemikonagi",
      "Karavostassi",
      "Larnaca",
      "Limassol",
      "Moni",
      "Morphou Bay",
      "Paphos",
      "Vassiliko",
      "Xeros",
    ],
    Georgia: ["Batumi", "Poti"],
    India: [
      "Beypore",
      "Bheemunipatnam",
      "Bombay",
      "Budge Budge",
      "Calcutta",
      "Calicut",
      "Cannanore",
      "Chennai",
      "Cochin",
      "Jawahar Dweep",
      "Kakinada",
      "Kandla",
      "Kochi",
      "Kolkata",
      "Madras",
      "Mangalore",
      "Mormugao",
      "Mumbai",
      "New Mangalore",
      "Okha",
      "Panaji",
      "Pir Pau",
      "Pondicherry",
      "Port Blair",
      "Port Okha",
      "Tellicherry",
      "Visakhapatnam",
      "Vizag",
    ],
    Indonesia: [
      "Ambon",
      "Ampenam",
      "Balikpapan",
      "Batu Ampar",
      "Belawan",
      "Bengkulu",
      "Benoa",
      "Biak",
      "Buatan",
      "Bunyu",
      "Cigading",
      "Cilacap",
      "Cirebon",
      "Citra Ujung Baru",
      "Dumai",
      "Gabion",
      "Gresik",
      "Jakarta",
      "Jambi",
      "Kabil",
      "Kalianget",
      "Kota Baru",
      "Kupang",
      "Labuantring",
      "Lembar",
      "Macassar",
      "Makassar",
      "Manado",
      "Medan",
      "Muntok",
      "North Pulau Laut Coat Terminal",
      "Palembang",
      "Pangkalan Susu",
      "Panjang",
      "Pare Pare",
      "Pekanbaru",
      "Plaju & Sungai Gerong",
      "Pontianak",
      "Pulau Laut",
      "Pulau Sambu",
      "Sabang",
      "Samarinda",
      "Sekupang",
      "Semarang",
      "Sibolga",
      "Sorong",
      "Sunda Kelapa",
      "Sungai Gerong",
      "Sungai Pakning",
      "Surabaya",
      "Tanjung Emas",
      "Tanjung Intan",
      "Tanjung Pandan",
      "Tanjung Perak",
      "Tanjung Priok",
      "Tanjung Uban",
      "Tarahan Terminal",
      "Tarakan Island",
      "Telok Ayer",
      "Teluk Bayur",
      "Ujung Pandang",
    ],
    Iran: [
      "Abadan",
      "Bahregan",
      "Bahregan Oil Center",
      "Bahrgan",
      "Bandar Abbas",
      "Bandar Imam Khomeini",
      "Bandar Mahshahr",
      "Bandar Shahid Bahonar",
      "Bandar Shahid Rejaie",
      "Barkan",
      "Bushehr",
      "Bushire",
      "Cyrus Terminal",
      "Kharg Island",
      "Khemco Terminal",
      "Lavan Island",
      "Shahid Bahonar",
      "Shahid Rajai",
      "Soroosh Terminal",
    ],
    Iraq: [
      "Abu Al Kashib",
      "Abu Fulus",
      "Ashar",
      "Basrah",
      "Fao",
      "Khor Al Amaya",
      "Khor Al Zubair",
      "Maqal",
      "Sunger",
    ],
    Israel: ["Ashdod", "Ashkelon", "Eilat", "Haifa", "Kishon Zone"],
    Japan: [
      "Aboshi",
      "Aburakawa",
      "Aioi",
      "Amagasaki",
      "Aomori",
      "Chiba",
      "Chita",
      "Etajima",
      "Fukuyama",
      "Funakawa",
      "Hakata",
      "Hakodate",
      "Hamada",
      "Hannan",
      "Hashihama",
      "Heianza",
      "Hibikinada",
      "Higashi-Harima",
      "Higashi-Ogishima",
      "Hikari",
      "Hikoshima",
      "Himeji",
      "Hiro",
      "Hirohata",
      "Hiroshima",
      "Iho",
      "Imabari",
      "Imari",
      "Ishikara",
      "Iwakuni",
      "Izumisano",
      "Kagoshima",
      "Kainan",
      "Kakogawa",
      "Kanmon Ko",
      "Kanokawa",
      "Karita",
      "Kashima",
      "Kawasaki",
      "Keihin",
      "Kikuma",
      "Kinwan",
      "Kishiwada",
      "Kitakyushu",
      "Kobe",
      "Kokura",
      "Kumadatsu",
      "Kure",
      "Kushiro",
      "Marugame",
      "Mategata",
      "Matsuyama",
      "Mega",
      "Miike",
      "Mitsukojima",
      "Mizushima",
      "Moji",
      "Muroran",
      "Nagasaki",
      "Nagoya",
      "Naha",
      "Namikata",
      "Niigata-Higashi",
      "Niigata-Nishi",
      "Nishihara",
      "Ofunato",
      "Ogishima",
      "Oita",
      "Omishima",
      "Onoda",
      "Osaka",
      "Owase",
      "Rokko Island",
      "Sakai",
      "Sakaide",
      "Sakaiminato",
      "Sasebo",
      "Senboku",
      "Shikama",
      "Shimizu",
      "Shimonoseki",
      "Shimotsu",
      "Shirashima",
      "Susaki",
      "Takasago",
      "Takehara",
      "Tamashima",
      "Tobata",
      "Tokai",
      "Tokuyama",
      "Tokyo",
      "Tonda",
      "Toyama",
      "Toyama-Shinko",
      "Tsuruga",
      "Ube",
      "Ukishima",
      "Wakamatsu",
      "Wakayama",
      "Yawata",
      "Yokkaichi",
      "Yokohama",
      "Yokosuka",
    ],
    Jordan: ["Aqaba", "Mo’ta", "Mushterak"],
    Kazakhstan: ["Aktau", "Almaty", "Atyrau"],
    Kuwait: [
      "Mina Abdulla",
      "Mina Al Ahmadi",
      "Mina Al Zour",
      "Mina Saud",
      "Shuaiba",
      "Shuwaikh",
    ],
    Kyrgyzstan: ["Osh"],
    Laos: ["Lanshi", "Vientiane", "Savannakhet"],
    Lebanon: [
      "Beirut",
      "Dora Terminal",
      "Saida",
      "Sidon",
      "Tripoli",
      "Zahrani Terminal",
    ],
    Malaysia: [
      "Biawak",
      "Butterworth",
      "Datuk Sim Kheng Hong",
      "Johor",
      "Kota Kinabalu",
      "Kuala Baram",
      "Kuching",
      "Labuan",
      "Lutong",
      "Malacca",
      "Miri",
      "Pasir Gudang",
      "Penang",
      "Pending",
      "Port Dickson",
      "Port Kelang",
      "Port Swettenham",
      "Prai",
      "Sandakan",
      "Sejingkat",
      "Senari",
      "Sibu",
      "Sungai Udang",
      "Tanah Puteh",
      "Tanjung Bruas",
      "Tanjung Manis",
      "Tawau",
      "Teluk Anson",
      "Westport",
    ],
    Maldives: ["Male"],
    Mongolia: ["Bulgan", "Ulaanbaatar"],
    Myanmar: [
      "Akyab",
      "Bassein",
      "Mawlamyine",
      "Moulmein",
      "Pathein",
      "Rangoon",
      "Sittwe",
      "Yangon",
    ],
    Nepal: [
      "Rumjatar",
      "Kathmandu-Tribhuva",
      "Nepal",
      "Surkhet",
      "Pokhara",
      "Bhairawa",
      "Birgunj",
      "Kathmandu",
      "Simara",
      "Jumla",
      "Biratnagar",
      "Syangboche",
      "Bharatpur",
      "Meghauli",
      "Lamidanda",
    ],
    "North Korea": ["Hungnam"],
    Oman: ["Mina al Fahal", "Muscat", "Port Sultan Qaboos"],
    Pakistan: ["Juna Bunder", "Karachi"],
    Palestine: ["Gaza Port"],
    Philippines: [
      "Bais",
      "Bataan",
      "Batangas",
      "Cebu",
      "Culasi",
      "Davao",
      "Dumaguit",
      "Estancia",
      "Hondagua",
      "Iloilo",
      "Jolo",
      "Jordan",
      "Lamao",
      "Legaspi",
      "Limay",
      "Lucanin",
      "Manila",
      "Mariveles",
      "Masbate",
      "Mati",
      "Olongapo",
      "Poro Point",
      "Roxas City",
      "San Fernando",
      "San Jose",
      "Sangi",
      "Santa Ana",
      "Sasa",
      "Subic Bay",
      "Toledo",
      "Villanueva",
      "Zamboanga",
    ],
    Qatar: ["Doha", "Halul Island", "Mesaieed", "Umm Said"],
    Russia: [
      "Archangel",
      "Bakarista",
      "Ekonomiya",
      "Kaliningrad",
      "Kandalaksha",
      "Leningrad",
      "Leviy Bereg",
      "Lomonosov",
      "Murmansk",
      "Novorossiysk",
      "Sheskharis",
      "St Petersburg",
      "Taganrog",
      "Tuapse",
      "Vladivostok",
      "Vyborg",
      "Yeisk",
      "Yeysk",
    ],
    "Saudi Arabia": [
      "Jeddah",
      "Ju’aymah Crude & LPG Terminal",
      "Ras al Khafji",
      "Ras Tanura",
      "Yanbu",
    ],
    Singapore: [
      "Brani Terminal",
      "Jurong",
      "Keppel",
      "Pasir Panjang",
      "Pulau Ayer Chawan",
      "Pulau Bukom",
      "Pulau Merlimau",
      "Pulau Pesek",
      "Pulau Sebarok",
      "Sembawang",
      "Singapore",
      "Tanjong Pagar",
    ],
    "South Korea": [
      "Busan",
      "Inchon",
      "Pohang",
      "Pusan",
      "Samil",
      "Yeosu",
      "Yosu",
    ],
    "Sri Lanka": [
      "China Bay",
      "Cod Bay",
      "Colombo",
      "Galle",
      "Malay Cove",
      "Trincomalee",
    ],
    Syria: ["Banias", "Latakia", "Tartous"],
    Taiwan: [
      "Kaohsiung",
      "Keelung",
      "Sha Lung Oil Terminal",
      "Ta-Lin-Pu Offshore Oil Terminal",
      "Tanshoei",
      "Yun-An LNG Terminal",
    ],
    Tajikistan: ["Dushanbe"],
    Thailand: [
      "Bang Hua Sua",
      "Bangkok",
      "Chongnonsri Marine Terminal",
      "Klong Toey",
      "Koh Si Chang Transhipment Area",
      "Kohsichang TPP",
      "Krung Thep",
      "Laem Chabang",
      "Phuket",
      "Sathupradit",
      "Sattahip",
      "Siam Seaport",
      "Sriracha Harbour",
      "Sriracha Oil Terminal",
    ],
    "Timor-Leste": ["Port Dili"],
    Turkey: [
      "Ambarli",
      "Bandirma",
      "Bodrum",
      "Borusan",
      "Canakkale",
      "Derince",
      "Edincik",
      "Fethiye",
      "Gemlik",
      "Haydarpasa",
      "Isdemir",
      "Iskenderun",
      "Istanbul",
      "Izmir",
      "Izmit",
      "Karakoy",
      "Marmaris",
      "Mersin",
      "Pirs Ekindzhiler",
      "Samsun",
      "Sinop",
      "Tutuncifilik",
      "Yarimca",
    ],
    Turkmenistan: ["Turkmenbashi", "Turkmenbashy", "Turkmenbasy"],
    "United Arab Emirates": [
      "Ajman",
      "Das Island",
      "Dubai",
      "Fateh Terminal",
      "Jebel Dhanna/Ruwais",
      "Port Khalid",
      "Port Rashid",
      "Ruwais",
      "Sharjah",
    ],
    Uzbekistan: ["Bukhara", "Tashkent"],
    Vietnam: [
      "Ben Nghe",
      "Cho-Lon",
      "Danang",
      "Haiphong",
      "Ho Chi Minh City",
      "Nha Be",
      "Saigon",
    ],
    Yemen: [
      "Aden",
      "Hodeidah",
      "Khalf Harbour",
      "Little Aden",
      "Ma’alla Terminal",
      "Mokha",
      "Mukalla",
      "Ras Alkatheeb",
      "Saleef",
    ],

    // africa
    Algeria: [
      "Algiers",
      "Annaba",
      "Arzew",
      "Arzew El-Djedid",
      "Bejaia",
      "Bethioua",
      "Bone",
      "Mostaganem",
      "Oran",
      "Philippeville",
      "Port Methanier",
      "Skikda",
    ],
    Angola: [
      "Cabinda",
      "Futila Terminal",
      "Lobito",
      "Luanda",
      "Mocamedes",
      "Namibe",
      "Porto Saco",
    ],
    Benin: ["Cotonou"],
    Botswana: ["Gaborone"],
    BurkinaFaso: [
      "Bobo Dioulasso",
      "Dori",
      "Gorom-Gorom",
      "Ouagadougou",
      "Dedougou",
      "Sebba",
    ],
    Burundi: ["Bujumbura"],
    CapeVerde: ["Porto Grande", "Porto Praia", "Sal Island"],
    Cameroon: [
      "Douala",
      "Ebome Marine Terminal",
      "Garoua",
      "Kole Terminal",
      "Kribi",
      "Limboh Terminal",
      "Moudi Terminal",
      "Tiko",
      "Victoria",
    ],
    CentralAfricanRepublic: ["Port fluvial de Bangui"],
    Chad: ["Ndjamena", "Moundou"],
    Comoros: [
      "Dzaoudzi",
      "Longoni",
      "Mamoudzou",
      "Mayotte",
      "Moroni",
      "Pamanzi Bay",
    ],
    CongoDemocraticRepublic: [
      "Ango-Ango",
      "Banana",
      "Boma",
      "Matadi",
      "Moanda Oil Terminal",
    ],
    CongoRepublic: ["Pointe-Noire"],
    IvoryCoast: ["CIABJ", "Espoir Terminal", "Fresco", "San Pedro"],
    Djibouti: ["Djibouti"],
    Egypt: [
      "Abu Zenima",
      "Adabiya",
      "Alexandria",
      "Ataqa",
      "El Alamein",
      "El Dekheila",
      "El Meks",
      "Hurghada",
      "Kosseir",
      "Mersa el Hamra",
      "Port Ibrahim",
      "Port Said",
      "Port Tewfik",
      "Quseir",
      "Ras Budran",
      "Ras Gharib",
      "Ras Shukheir",
      "Ras Sudr",
      "Safaga",
      "Suez",
      "Wadi Feiran",
    ],
    EquatorialGuinea: ["Malabo", "Punta Europa Terminal", "Rey Malabo"],
    Eritrea: ["Assab", "Massawa"],
    Ethiopia: ["Assab"],
    Gabon: ["Gamba", "Libreville", "Ovendo", "Owendo", "Port Gentil"],
    Gambia: ["Banjul"],
    Ghana: ["Takoradi", "Tema"],
    Guinea: ["Conakry"],
    GuineaBissau: ["Bissau"],
    Kenya: [
      "Kilindi",
      "Kipevu Oil Terminal",
      "Mbaraki",
      "Mombasa",
      "Port Reitz",
      "Port Tudor",
      "Shimanzi Oil Terminal",
    ],
    Lesotho: ["Lesotho", "Tlokoeng", "Mokhotlong", "Mafeteng", "Maseru"],
    Liberia: ["Buchanan", "Monrovia"],
    Libya: [
      "Benghazi",
      "Es Sider",
      "Marsa al Hariga",
      "Marsa El Brega",
      "Ras Lanuf",
      "Rasco Harbour",
      "Sirtica Terminal",
      "Tarabulus",
      "Tobruk",
      "Tripoli",
      "Zueitina",
    ],
    Madagascar: [
      "Andoany",
      "Antalaha",
      "Antsiranana",
      "Diego Suarez",
      "Fort Dauphin",
      "Mahajanga",
      "Majunga",
      "Manakara",
      "Mananjary",
      "Morondava",
      "Nosy Be",
      "Tamatave",
      "Toamasina",
      "Tolagnaro",
      "Tulear",
    ],
    Malawi: ["Blantyre"],
    Mali: ["Tombouctou"],
    Mauritania: [
      "Nouadhibou",
      "Nouakchott",
      "Point Central",
      "Port de L’Amitie",
      "Port Etienne",
    ],
    Mauritius: ["Port Louis"],
    Morocco: [
      "Agadir",
      "Al Hoceima",
      "Casablanca",
      "Kenitra",
      "Mohammedia",
      "Port de Fedala",
      "Port Nador",
      "Safi",
      "Tangier",
    ],
    Mozambique: [
      "Beira",
      "Maputo",
      "Matola",
      "Mozambique Island",
      "Nacala",
      "Pemba",
      "Quelimane",
    ],
    Namibia: ["Walvis Bay"],
    Niger: ["Niamey", "Birni Nkoni", "Maradi", "Arlit"],
    Nigeria: [
      "Apapa",
      "Bonny Inshore Terminal",
      "Calabar",
      "Dawes Island",
      "Dockyard Creek",
      "Escravos Oil Terminal",
      "Forcados Oil Terminal",
      "Lagos",
      "Okrika",
      "Pennington",
      "Port Harcourt",
      "Qua Iboe",
    ],
    Rwanda: ["Kigali"],
    SaoTomeAndPrincipe: ["Sao Tome"],
    Senegal: ["Dakar", "M’Bao Oil Terminal"],
    Seychelles: ["Mahe", "Port Victoria"],
    SierraLeone: ["Freetown", "Kissy Oil Terminal", "Pepel"],
    Somalia: ["Berbera", "Chisimaio", "Kismayu", "Mogadiscio"],
    SouthAfrica: [
      "Cape Town",
      "Durban",
      "East London",
      "Mossel Bay",
      "Port Elizabeth",
      "Port Natal",
      "Saldanha Bay",
      "Simonstown",
    ],
    Sudan: ["Marsa Bashayer Export Terminal", "Port Sudan", "Suakin"],
    Tanzania: [
      "Dar es Salaam",
      "Mjimwema Oil Terminal",
      "Mtwara",
      "Tanga",
      "Zanzibar City",
    ],
    Togo: ["Kpeme", "Lome"],
    Tunisia: [
      "Bizerte",
      "Gabes",
      "La Goulette",
      "La Skhirra",
      "Rades",
      "Sfax",
      "Tunis",
    ],
    Uganda: ["Kampala Port", "Entebbe Port", "Jinja port"],
    Zambia: ["Lusaka"],
    Zimbabwe: ["Harare"],

    // Europe
    Russia: [
      "Archangel",
      "Bakarista",
      "Ekonomiya",
      "Kaliningrad",
      "Kandalaksha",
      "Leningrad",
      "Leviy Bereg",
      "Lomonosov",
      "Murmansk",
      "Novorossiysk",
      "Sheskharis",
      "St Petersburg",
      "Taganrog",
      "Tuapse",
      "Vladivostok",
      "Vyborg",
      "Yeisk",
      "Yeysk",
    ],
    Germany: [
      "Blexen",
      "Brake",
      "Bremen",
      "Bremerhaven",
      "Brunsbuttel",
      "Butzfleth",
      "Cuxhaven",
      "Elbeharbour",
      "Elsfleth",
      "Emden",
      "Flensburg",
      "Hamburg",
      "Holtenau",
      "Kiel",
      "Kiel-Holtenau",
      "Laboe",
      "Lubeck",
      "Nordenham",
      "Ostermoor",
      "Rostock",
      "Stade",
      "Stadersand",
      "Stralsund",
      "Travemunde",
      "Uetersen",
      "Warnemunde",
      "Wesertport",
      "Wilhelmshaven",
      "Wismar",
    ],
    "United Kingdom": [
      "Aberdeen",
      "Aberdovey",
      "Aboyne",
      "Alexandria",
      "Annalong",
      "Annan",
      "Anstruther",
      "Appledore",
      "Arbroath",
      "Ardglass",
      "Ardrishaig",
      "Avonmouth",
      "Ayr",
      "Banff",
      "Barmouth",
      "Barnes",
      "Bathgate",
      "Bedlington",
      "Berwick-upon-Tweed",
      "Bideford",
      "Bird Port",
      "Birmingham",
      "Birtley",
      "Blyth",
      "Bolton",
      "Boston",
      "Braefoot Bay",
      "Brandon",
      "Bridgwater",
      "Bridlington",
      "Brierley Hill",
      "Brightlingsea",
      "Bristol",
      "Bryn",
      "Buckie",
      "Bude",
      "Burghead",
      "Burntisland",
      "Caernarfon",
      "Caerphilly",
      "Cairnryan",
      "Caledonian Canal",
      "Cambus",
      "Cardiff",
      "Carnlough",
      "Castle Bay",
      "Charleston",
      "Charlestown",
      "Coatbridge",
      "Colchester",
      "Coleraine",
      "Conwy",
      "Corpach",
      "Coventry",
      "Cowes",
      "Creeksea",
      "Crinan Canal",
      "Croydon",
      "Dagenham",
      "Dartford",
      "Devonport",
      "Dewsbury",
      "Dingle",
      "Dover Strait",
      "Dumbarton",
      "Dunbar",
      "Dundee",
      "Dunoon",
      "Exeter",
      "Exmouth",
      "Falmouth",
      "Fawley",
      "Felixstowe",
      "Fishguard",
      "Fleetwood",
      "Folkestone",
      "Forth Ports",
      "Fosdyke",
      "Fraserburgh",
      "Garieston",
      "Garlieston",
      "Girvan",
      "Glasgow Apt",
      "Glensanda",
      "Goole",
      "Gourock",
      "Grangemouth",
      "Greenock",
      "Grimsby",
      "Halifax",
      "Hampton",
      "Harwich",
      "Holyhead",
      "Hound Point",
      "Howdendyke",
      "Hull",
      "Hunterston",
      "Hyde",
      "Ilford",
      "Immingham",
      "Inverness",
      "Ipswich",
      "Irvine",
      "Isle Of Grain",
      "Isle of Whithorn",
      "Kilkeel",
      "Kilroot",
      "Kirkcudbright",
      "Kirkwall",
      "Knowsley",
      "Kyle of Lochalsh",
      "Lancaster",
      "Largs",
      "Larne",
      "Leith",
      "Lerwick",
      "Linton",
      "Littlehampton",
      "Liverpool",
      "Llanarmon",
      "Llanddulas",
      "Lochaline",
      "Lochboisdale",
      "Loch Gairloch",
      "Lochmaddy",
      "London",
      "Londonderry",
      "London Gateway",
      "Looe",
      "Lossiemouth",
      "Lowestoft",
      "Lybster",
      "Lydney",
      "Macduff",
      "Machrihanish",
      "Maldon",
      "Mallaig",
      "Manchester",
      "Medway Ports",
      "Mevagissey",
      "Middlesborough",
      "Minworth",
      "Mistley",
      "Montrose",
      "Moston",
      "Mostyn",
      "Nailsea",
      "Nairn",
      "Neath Abbey",
      "New Holland",
      "Newlyn",
      "Norwich",
      "Padstow",
      "Par",
      "Peebles",
      "Pembroke",
      "Penryn",
      "Penzance",
      "Perth",
      "Peterhead",
      "Plymouth",
      "Point Of Ayre",
      "Pontefract",
      "Poole",
      "Poplar",
      "Port Askaig",
      "Portavogie",
      "Portbury",
      "Port Ellen",
      "Porthmadog",
      "Portishead",
      "Port Lamont",
      "Portland",
      "Port Penrhyn",
      "Port Sunlight",
      "Port Sutton Bridge",
      "Port Talbot",
      "Port William",
      "Preston",
      "Pwllheli",
      "Ramsgate",
      "Richborough",
      "Rotherham",
      "Rothes",
      "Royston",
      "Runcorn",
      "Rye",
      "Salt End",
      "Saundersfoot",
      "Scalloway",
      "Scarborough",
      "Scrabster",
      "Seaham",
      "Selby",
      "Sheerness",
      "Sheffield",
      "Shoreham",
      "Shotton",
      "Silloth",
      "Southampton",
      "South Shields",
      "Stockton-on-Tees",
      "Stornoway",
      "Strangford",
      "Stranraer",
      "Stretford",
      "Stromness",
      "Sunderland",
      "Sutton Bridge",
      "Swansea",
      "Teesport",
      "Teignmouth",
      "Tetney Terminal",
      "Thamesport",
      "Thurso",
      "Tilbury",
      "Tobermory",
      "Torquay",
      "Tranent",
      "Trent Wharves",
      "Troon",
      "Truro",
      "Ullapool",
      "Warrenpoint",
      "Warrington",
      "Washington",
      "Watchet",
      "Wemyss Bay",
      "Weston",
      "Weymouth",
      "Whitby",
      "Whitland",
      "Whitstable",
      "Wick",
      "Widnes",
      "Wigan",
      "Wisbech",
      "Workington",
      "Wrexham",
      "Yarmouth",
      "York",
    ],
    France: [
      "Ajaccio",
      "Ambes",
      "Antibes",
      "Antifer",
      "Basse Indre",
      "Bassens",
      "Bastia",
      "Bayonne",
      "Bec d’ Ambes",
      "Blaye",
      "Bordeaux",
      "Boulogne-sur-Mer",
      "Brest",
      "Caen",
      "Calais",
      "Cannes",
      "Caronte",
      "Cherbourg",
      "Cordemais",
      "Corniguel",
      "Coueron",
      "Dieppe",
      "Donges",
      "Dunkirk",
      "Etang de Berre",
      "Fos",
      "Gravenchon",
      "Haut Indre",
      "Honfleur",
      "Indret",
      "La Ciotat",
      "La Mede",
      "La Nouvelle",
      "La Pallice",
      "La Pointe de Berre",
      "La Rochelle",
      "La Rochelle-Pallice",
      "La Seyne-Bregaillon",
      "Lavera",
      "Le Havre",
      "Le Verdon",
      "Lorient",
      "Marseilles",
      "Montoir",
      "Nantes-St Nazaire",
      "Nice",
      "Paimboeuf",
      "Pauillac",
      "Petit Couronne",
      "Port de Bouc",
      "Port Jerome",
      "Port St Louis du Rhone",
      "Port St Nicholas",
      "Port Toga",
      "Port Tudy",
      "Quimper-Corniguel",
      "Rouen",
      "Sete",
      "St Malo",
      "St Nazaire",
      "Toulon La Seyne",
      "Villefranche",
    ],
    Italy: [
      "Ancona",
      "Arbatax",
      "Assemini",
      "Augusta",
      "Bagnoli",
      "Baia",
      "Bari",
      "Brindisi",
      "Cagliari",
      "Castellammare di Stabia",
      "Catania",
      "Civitavecchia",
      "Crotone",
      "Falconara",
      "Fiumicino",
      "Formia",
      "Gaeta",
      "Gela",
      "Genoa",
      "La Maddalena (Cagliari)",
      "La Maddalena (Sardinia)",
      "La Spezia",
      "Leghorn",
      "Livorno",
      "Melilli Oil Terminal",
      "Messina",
      "Milazzo",
      "Monfalcone",
      "Monopoli",
      "Naples",
      "Ortona",
      "Otranto",
      "Palau",
      "Palermo",
      "Portici",
      "Porto Corsini",
      "Porto di Malamocco",
      "Porte Empedocle",
      "Porto Foxi",
      "Porto Marghera",
      "Porto Marmoreo",
      "Porto San Leonardo",
      "Porto Santo Stefano",
      "Porto Torres",
      "Pozzuoli",
      "Priolo",
      "Priolo Gargallo",
      "Punto Franco",
      "Quiliano Terminal",
      "Ravenna",
      "Reggio Calabria",
      "San Vitale",
      "Santa Panagia Bay",
      "Sarroch",
      "Savona-Vado",
      "Siracusa",
      "Talamone",
      "Taranto",
      "Termini Imerese",
      "Torre Annunaziata",
      "Torre del Greco",
      "Trapani",
      "Trieste",
      "Vado Ligure",
      "Venice",
    ],
    Spain: [
      "Abra",
      "Algeciras",
      "Alicante",
      "Almeria",
      "Aviles",
      "Barcelona",
      "Bilbao",
      "Burriana",
      "Cadiz",
      "Cala Figuera",
      "Cartagena",
      "Castellon",
      "Castro-Urdiales",
      "Ceuta",
      "Corcubion",
      "Corunna",
      "Escombreras",
      "Ferrol",
      "Gijon",
      "Huelva",
      "La Coruna",
      "Mahon",
      "Malaga",
      "Melilla",
      "Palma",
      "Pasajes",
      "Puerto De Santa Maria",
      "Puerto Real",
      "Puerto Santa Maria",
      "Punta Ceballos Tanker Terminal",
      "Punta Lucero Tanker Terminal",
      "Raos",
      "Rota",
      "San Esteban de Pravia",
      "San Sebastian",
      "Santander",
      "Santurce",
      "Seville",
      "Tarragona",
      "Torrevieja",
      "Valencia",
      "Vigo",
      "Zorroza",
    ],
    Poland: ["Gdansk", "Gdynia", "Port Polnocny", "Swinoujscie", "Szczecin"],
    Ukraine: [
      "Azovstal",
      "Feodosia",
      "Ilyichevsk",
      "Kerch",
      "Kherson",
      "Mariupol",
      "Odessa",
      "Reni",
      "Sevastopol",
      "Theodosia",
      "Zhdanov",
    ],
    Romania: ["Constantza", "Galatz"],
    Netherlands: [
      "Amsterdam",
      "Axel Plain",
      "Beverwijk",
      "Botlek",
      "Braakman Harbour",
      "Delfzijl",
      "Den Helder",
      "Dordrecht",
      "Europoort",
      "Flushing",
      "Hansweert",
      "Hoek van Holland",
      "Hook of Holland",
      "Ijmuiden",
      "Maassluis",
      "Maasvlakte",
      "Middelburg",
      "Moerdijk",
      "Pernis",
      "Port Scaldia",
      "Rotterdam",
      "Rozenburg",
      "Sas Van Gent",
      "Schiedam",
      "Terneuzen",
      "Velsen",
      "Vlaardingen",
      "Vlissingen",
      "Ymuiden",
      "Zaandam",
      "Zaanstad",
    ],
    Belgium: ["Antwerp", "Bruges", "Ghent", "Ostend", "Zeebrugge"],
    "Czech Republic (Czechia)": ["Brno", "Prague", "Rudna"],
    Sweden: [
      "Ahus",
      "Ala",
      "Axelsvik Oil Terminal",
      "Bado",
      "Bollsta",
      "Braviken",
      "Brofjorden",
      "Bulkhamnen",
      "Djuro",
      "Domsjo",
      "Donso",
      "Edstrandsbassangen",
      "Fredriksskans",
      "Frihammen",
      "Froland",
      "Gastgivarehagen",
      "Gavle",
      "Gefle",
      "Goteborg",
      "Gothenburg",
      "Granudden",
      "Hallstavik",
      "Halmstad",
      "Hammarbyhamnen",
      "Hargshamn",
      "Harnosand",
      "Helsingborg",
      "Hudiksvall",
      "Husum",
      "Kage",
      "Kalix",
      "Kalmar",
      "Karlsborg",
      "Karlshall",
      "Karkshamn",
      "Karkskrona",
      "Karlstad",
      "Karksvik",
      "Karskar",
      "Kolo Harbour",
      "Kubikenborg",
      "Landskrona",
      "Langror",
      "Limhamn",
      "Lomma",
      "Loudden",
      "Lugnvik",
      "Lulea",
      "Lysekil",
      "Malmo",
      "Marstand",
      "Norrkoping",
      "Nyhamn",
      "Nykoping",
      "Nynashamn",
      "Ohmans",
      "Ornskoldsvik",
      "Orrskar",
      "Ortviken",
      "Oskarshamn",
      "Ostrand",
      "Oxelosund",
      "Oxhaga Harbour",
      "Pampus Harbour",
      "Paskallavik",
      "Pitea",
      "Ramshall",
      "Ronneyby",
      "Ronnskar",
      "Rya Harbour",
      "Sandarne",
      "Skelleftea",
      "Skeppsbron",
      "Skoghall",
      "Skredsvik",
      "Skutskar",
      "Slite",
      "Soderhamn",
      "Sodertalje & Sodertalje Canal",
      "Solvesborg",
      "Soraker",
      "Stadsgarden",
      "Stenungsund",
      "Stilleryd Harbour",
      "Stockholm",
      "Stockvik",
      "Stormskar Oil Terminal",
      "Stroemstad",
      "Stugsund",
      "Sundsvall",
      "Sutudden Harbour",
      "Tallbacken",
      "Trelleborg",
      "Tunadalshamnen",
      "Uddebo",
      "Uddevalla",
      "Umea",
      "Utansjo",
      "Vaja",
      "Vallvik",
      "Varberg",
      "Vartahamnen",
      "Vasteras",
      "Vastervik",
      "Wallhamn",
    ],
    Portugal: [
      "Douro",
      "Faro & Olhao",
      "Leixoes",
      "Lisbon",
      "Oporto",
      "Santa Apolonia",
      "Setubal",
    ],
    Greece: [
      "Acandia",
      "Alexandroupoli",
      "Amaliapolis",
      "Anthousa",
      "Astakos",
      "Chalkida",
      "Chios",
      "Corinth",
      "Elefsina",
      "Eleusis",
      "Gythio",
      "Igoumenitsa",
      "Kalamata",
      "Kalymnos",
      "Kavala",
      "Kea",
      "Kefalonia",
      "Kimi",
      "Korinthos",
      "Kozani",
      "Lesbos",
      "Lindos",
      "Limnos",
      "Mytilene",
      "Piraeus",
      "Rafina",
      "Rhodes",
      "Samos",
      "Salamis",
      "Skaramangas",
      "Skiathos",
      "Souda",
      "Spetses",
      "Syros",
      "Thessaloniki",
      "Volos",
    ],

    Hungary: ["Budapest", "Debrecen", "Pecs"],

    Austria: ["Enns", "Linz", "Salzburg", "Vienna", "Wels", "Wien"],

    Belarus: ["Brest"],

    Switzerland: ["BASEL", "Muttenz", "Zurich "],

    Bulgaria: ["Bourgas", "Pomorie", "Sozopol", "Tzarevo", "Varna "],

    Serbia: ["Bar, Kotor, Novi Sad, Risan, Zelenika "],

    Denmark: [
      "Aabenraa",
      "Aalborg",
      "Aarhus",
      "Asnaesvaerkets Havn",
      "Avernakke",
      "Copenhagen",
      "Ebeltoft",
      "Elsinore",
      "Ensted",
      "Esbjerg",
      "Fredericia",
      "Frederikshavn",
      "Frederikssund",
      "Gulfhavn",
      "Helsingor",
      "Horsens",
      "Kalundborg",
      "Karrebaeksminde",
      "Koge",
      "Kolding",
      "Korsoer",
      "Kyndby",
      "Lindholm",
      "Lindoe Terminal",
      "Lyngs Odde",
      "Masnedovaerkets Havn",
      "Naestved",
      "Nyborg",
      "Odense",
      "Orehoved",
      "Ronne",
      "Rudkobing",
      "Skaelskor",
      "Skaerbaek",
      "Skagen",
      "Stigsnaesvaerkets Havn",
      "Svendborg",
      "Tuborg",
      "Vordingborg ",
    ],

    Finland: [
      "Abo",
      "Ajos",
      "Haakoninlahti",
      "Hamina",
      "Hanko",
      "Haponniemi",
      "Helsinki",
      "Hepokari",
      "Inkoo",
      "Jakobstad",
      "Kemi",
      "Kokkola",
      "Kotka",
      "Kristinestad",
      "Laajasalo Oil Harbour",
      "Loviisa",
      "Mantyluoto",
      "Naantali",
      "Nuottasaari",
      "Oritkari",
      "Oulu",
      "Pansio",
      "Pateniemi",
      "Pietarsaari",
      "Pori",
      "Porvoo",
      "Rauma",
      "Reposaari",
      "Tolkkinen-Tolkis",
      "Toppila",
      "Turku",
      "Uusikaupunki",
      "Veitsiluoto",
      "Vihreasaari",
      "Vuosaari Harbour",
      "Ykspihlaja",
    ],

    Norway: [
      "Aalesund",
      "Aker Base",
      "Ardalstangen",
      "Arendal",
      "Bergen",
      "Bodo",
      "Borg Havn IKS",
      "Breivika",
      "Brevik",
      "Drammen",
      "Egersund",
      "Fagerstand",
      "Fiborgtangen",
      "Fredrikstad",
      "Gismeroy",
      "Grenland Harbour",
      "Grimstad",
      "Haavik",
      "Halden",
      "Hammerfest",
      "Harstad",
      "Haugesund",
      "Heroya",
      "Holmen",
      "Homsvik",
      "Honningsvag",
      "Horten",
      "Hoyanger",
      "Husnes",
      "Kambo",
      "Kirkenes",
      "Kleven",
      "Kristiansand",
      "Kristiansund",
      "Langesund",
      "Larvik",
      "Mandal",
      "Mellos Harbour",
      "Mjanesholmen",
      "Mo I Rana",
      "Moss",
      "Naersnes",
      "Narvik",
      "Orkanger",
      "Oslo",
      "Porsgrunn",
      "Prostneset",
      "Rafnes",
      "Risavika",
      "Sandefjord",
      "Sandnes",
      "Sarpsborg",
      "Sjursoya",
      "Skien",
      "Skogn",
      "Slagen",
      "Sola",
      "Stavanger",
      "Svartnes",
      "Svelvik",
      "Svolvaer",
      "Tananger",
      "Tangen",
      "Thamshavn",
      "Tonsberg",
      "Tromsdalen",
      "Tromso",
      "Trondheim",
      "Vardo",
    ],

    Slovakia: ["Bratislava"],

    Ireland: [
      "Aughinish",
      "Bantry",
      "Castletown Bere",
      "Cobh",
      "Cork",
      "Dinish Island",
      "Drogheda",
      "Dublin",
      "Dun Laoghaire",
      "Duncannon",
      "Foynes",
      "Galway",
      "Haulbowline",
      "Howth",
      "Kilrush",
      "Leahill Quarry",
      "Limerick",
      "Moneypoint",
      "Rathmullen",
      "Ringaskiddy",
      "Rosslare Europort",
      "Rushbrooke",
      "Shannon Foynes Port",
      "Sligo",
      "Tarbet Island",
      "Waterford",
      "Whiddy Island",
      "Whitegate",
    ],

    Croatia: [
      "Bakar",
      "Dubrovnik",
      "Gazenica",
      "Krk Island",
      "Luka Gruz",
      "Omisalj",
      "Pula",
      "Rijeka",
      "Rijeka Dubrovacka",
      "Sepen",
      "Sibenik",
      "Split",
      "Srecica",
      "Susak",
      "Urinj",
      "Zadar",
    ],

    "Bosnia and Herzegovina": ["Sarajevo"],

    Moldova: ["Giurgiulesti", "Tiraspol "],

    Lithuania: ["Klaipeda"],

    Albania: ["Vlone", "Vlore "],

    Slovenia: ["Izola", "Koper", "Piran "],

    Latvia: ["Lielupe", "Liepaja", "Riga", "Ventspils"],

    Macedonia: ["Skopje"],

    Estonia: [
      "Kesklinna",
      "Kopli-Port of Tallinn",
      "Muuga-Port of Tallinn",
      "Novotallinsky",
      "Old City Harbour-Port of Tallinn",
      "Paldiski-Port of Tallinn",
      "Paljassaare",
      "Tallinn",
    ],

    Luxembourg: ["MERTERT Port "],

    Montenegro: ["BAR"],

    Malta: ["Marsaxlokk, Valleta "],

    Iceland: [
      "Grundartangi",
      "Hafnarfjordur",
      "Keflavik-Njarovik",
      "Njarovik",
      "Reykjavik",
      "Seydisfjordur",
      "Straumsvik - Straumsvik Port ",
    ],

    Andorra: [" Andorra Port "],

    Liechtenstein: ["Vaduz Port "],

    Monaco: ["Monaco"],

    "San Marino": ["Acquaviva"],
  };

  const [allships, setAllships] = useState([]);

  // fetch ship data
  useEffect(() => {
    async function fetchdata() {
      try {
        const res1 = await axios.get(`${config.base_url}viewShip`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res1.data.status === 200) {
          console.log(res1);
          setAllships(res1.data.data.reverse());
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [config.base_url]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4; // Number of cards per page
  const totalPages = Math.ceil(filteredShips.length / itemsPerPage);

  const handleSearch = () => {
    if (!selectedCountry) return;
    // Filter ships based on the selected country
    const results = allships.filter(
      (ship) => ship.flag.toLowerCase() === selectedCountry.toLowerCase()
    );
    setFilteredShips(results);
    setSearchPerformed(true);
  };

  const handleSearchRight = () => {
    if (!selectedRightCountry) return;
    // Filter ships based on the selected country
    const results = allships.filter(
      (ship) => ship.flag.toLowerCase() === selectedRightCountry.toLowerCase()
    );
    setFilteredShips(results);
    setSearchPerformed(true);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedCountry(null);
    setPorts([]);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption?.value || null);
    setSearchPerformed(false);
    setPorts(
      (portsData[selectedOption.value] || []).map((port) => ({
        value: port,
        label: port,
      }))
    );
  };

  const handleBack = () => {
    setSearchPerformed(false);
    setSelectedCountry(null);
    setSelectedRegion(null);
    setPorts([]);
    setCurrentPage(1);
  };

  

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedShips = filteredShips.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  //   right side
  const handleRightRegionClick = (region) => {
    setSelectedRightRegion(region);
    setSelectedRightCountry(null);
    setRightPorts([]);
  };

  const handleRightCountryChange = (selectedOption) => {
    setSelectedRightCountry(selectedOption?.value || null);
    setSearchPerformed(false);
    setRightPorts(
      (portsData[selectedOption.value] || []).map((port) => ({
        value: port,
        label: port,
      }))
    );
  };

  const handleRightBack = () => {
    setSearchPerformed(false);
    setSelectedRightCountry(null);
    setSelectedRightRegion(null);
    setRightPorts([]);
    setCurrentPage(1);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust the value to when you want the effect
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="">
        <LogosticsNav />

        <section className="bg-gradient-to-r from-[#2e5775] to-[#326e99] py-[50px] px-[80px] xl:px-[40px] md:px-[20px] xm:px-[10px] xm:py-[20px]">
          <div className="border-2 border-white py-5 px-5 xs:px-2">
            <h1 className="text-gray-50  text-center font-bold text-[30px] xs:text-[24px]">
              Logistics & Transport
            </h1>

            <div className="flex justify-between 3xl:px-[50px]  2xl:px-1 flex-wrap gap-10 2xl:justify-center items-center px-[150px] py-[50px]">
              {/* left side */}
              <div className="">
                <div className="flex gap-3 items-center xl:ml-0 ml-5">
                  <img
                    className="w-[65px] rounded-full h-[65px]"
                    src={ship}
                    alt=""
                  />
                  <h1 className="text-xl text-white font-semibold">
                    Ship Ready To Charter
                  </h1>
                </div>

                <div className="mt-5 flex flex-col  w-[400px] xl:w-[780px] lg:w-[730px] Lg:w-[650px] md:w-[580px] sm:w-auto  xs:w-auto text-center gap-8 text-[#d1a460] text-xl">
                  {selectedRegion ? (
                    <>
                      {searchPerformed ? (
                        // Display Cards After Search
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xm:grid-cols-1 gap-6 w-full">
                            {displayedShips.length > 0 ? (
                              displayedShips.map((ship, index) => (
                                <div
                                  key={index}
                                  className="bg-white relative h-[230px] shadow-lg rounded-lg transition-all cursor-pointer hover:scale-105 duration-300  "
                                >
                                  <img
                                    src={ship.image}
                                    className="h-[100px] w-full rounded-t-lg "
                                    alt=""
                                  />

                                 <div className="px-2 py-3">
                                    <p className="text-black font-semibold">
                                      {ship.title}
                                    </p>
                                    <p className="text-black absolute bottom-0 right-0 left-0 italic ">
                                      {ship.flag}
                                    </p>
                                 </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-red-600 text-xl col-span-full">
                                No Ships Available...
                              </p>
                            )}
                          </div>
                          {/* Pagination Controls */}
                          <div className="flex justify-center items-center gap-2 mt-5">
                            <button
                              className={`px-4 py-2 bg-[#123d5f] text-white rounded-sm ${
                                currentPage === 1
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:bg-[#172f41ed]"
                              }`}
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <span className="px-4 py-2 bg-[#d1a460] text-white rounded-sm">
                              {currentPage}
                            </span>
                            <button
                              className={`px-4 py-2 bg-[#0d2c45] text-white rounded-sm ${
                                currentPage === totalPages
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:bg-[#172f41ed]"
                              }`}
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              <i className="fa-solid fa-chevron-right"></i>
                            </button>
                          </div>
                          {/* Back to Regions Button */}
                          <div className="flex justify-center mt-5">
                            {searchPerformed ? (
                              // Back to Countries Button
                              <button
                                className="capsule-3d border border-white rounded-full py-3 w-[100%] m-auto mt-2"
                                onClick={() => {
                                  setSearchPerformed(false); // Show countries
                                  setFilteredShips([]);
                                }}
                              >
                                <i className="fa-solid fa-arrow-left me-2"></i>{" "}
                                Back to Countries
                              </button>
                            ) : selectedRegion ? (
                              // Back to Regions Button
                              <button
                                className="capsule-3d border border-white rounded-full py-3 w-[100%] m-auto mt-2"
                                onClick={() => {
                                  setSelectedRegion(null); // Show regions
                                  setSelectedCountry(null);
                                }}
                              >
                                <i className="fa-solid fa-arrow-left me-2"></i>{" "}
                                Back to Regions
                              </button>
                            ) : null}
                          </div>
                        </>
                      ) : (
                        // Display Select Options
                        <>
                          <Select
                            className="rounded-full w-[100%] m-auto"
                            options={regions[selectedRegion]}
                            placeholder="Select a country"
                            onChange={handleCountryChange}
                            isSearchable
                            getOptionLabel={(e) => (
                              <div className="flex items-center gap-2">
                                <img src={e.flag} alt="" className="w-5 h-5" />
                                {e.label}
                              </div>
                            )}
                          />
                          {selectedCountry && (
                            <Select
                              className="rounded-full w-[100%]  mt-5"
                              options={ports}
                              placeholder="Select a port"
                              isSearchable
                            />
                          )}
                          <button
                            onClick={handleSearch}
                            className="bg-[#d1a460] hover:bg-[#d39c4a] text-white rounded-full py-3 w-[100%] m-auto mt-2"
                          >
                            Search
                          </button>
                          <button
                            className="capsule-3d border border-white rounded-full py-3 w-[100%] m-auto mt-2"
                            onClick={handleBack}
                          >
                            <i className="fa-solid fa-arrow-left fa-beat me-2"></i>{" "}
                            Back to Regions
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    // Render Region Options
                    Object.keys(regions).map((region) => (
                      <button
                        key={region}
                        className="capsule-3d border border-white rounded-full py-3 w-[100%] m-auto"
                        onClick={() => handleRegionClick(region)}
                      >
                        {region}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* right side */}
              <div>
                <div className="flex gap-3 items-center ml-5 xl:ml-0">
                  <img
                    className="w-[65px]  
                     h-[60px] bg-white rounded-full"
                    src={cargo}
                    alt=""
                  />
                  <h1 className="text-xl text-white font-semibold">
                    Cargo Ready To Load
                  </h1>
                </div>

                <div className="mt-5 flex flex-col  w-[400px] xl:w-[780px] lg:w-[730px] Lg:w-[650px] md:w-[580px] sm:w-auto  xs:w-auto text-center gap-8 text-[#d1a460] text-xl">
                {selectedRightRegion?(
                  <>
                  {searchPerformed ? (
                          // Display Cards After Search
                          <>
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xm:grid-cols-1 gap-6 w-full">
                              {displayedShips.length > 0 ? (
                                displayedShips.map((ship, index) => (
                                  <div
                                    key={index}
                                    className="bg-white relative h-[230px] shadow-lg rounded-lg transition-all cursor-pointer hover:scale-105 duration-300  "
                                  >
                                    <img
                                      src={ship.image}
                                      className="h-[100px] w-full rounded-t-lg "
                                      alt=""
                                    />
  
                                   <div className="px-2 py-3">
                                      <p className="text-black font-semibold">
                                        {ship.title}
                                      </p>
                                      <p className="text-black absolute bottom-0 right-0 left-0 italic ">
                                        {ship.flag}
                                      </p>
                                   </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-red-600 text-xl col-span-full">
                                  No Ships Available...
                                </p>
                              )}
                            </div>
                            {/* Pagination Controls */}
                            <div className="flex justify-center items-center gap-2 mt-5">
                              <button
                                className={`px-4 py-2 bg-[#123d5f] text-white rounded-sm ${
                                  currentPage === 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-[#172f41ed]"
                                }`}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                <i className="fa-solid fa-chevron-left"></i>
                              </button>
                              <span className="px-4 py-2 bg-[#d1a460] text-white rounded-sm">
                                {currentPage}
                              </span>
                              <button
                                className={`px-4 py-2 bg-[#0d2c45] text-white rounded-sm ${
                                  currentPage === totalPages
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-[#172f41ed]"
                                }`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >
                                <i className="fa-solid fa-chevron-right"></i>
                              </button>
                            </div>
                            {/* Back to Regions Button */}
                            <div className="flex justify-center mt-5">
                              {searchPerformed ? (
                                // Back to Countries Button
                                <button
                                  className="capsule-3d border border-white rounded-full py-3 w-[100%] m-auto mt-2"
                                  onClick={() => {
                                    setSearchPerformed(false); // Show countries
                                    setFilteredShips([]);
                                  }}
                                >
                                  <i className="fa-solid fa-arrow-left me-2"></i>{" "}
                                  Back to Countries
                                </button>
                              ) : selectedRightRegion ? (
                                // Back to Regions Button
                                <button
                                  className="capsule-3d border border-white rounded-full py-3 w-[100%] m-auto mt-2"
                                  onClick={() => {
                                    setSelectedRightRegion(null); // Show regions
                                    setSelectedRightCountry(null);
                                  }}
                                >
                                  <i className="fa-solid fa-arrow-left me-2"></i>{" "}
                                  Back to Regions
                                </button>
                              ) : null}
                            </div>
                          </>
                        ) : (
                          // Display Select Options
                          <>
                            <Select
                              className="rounded-full w-[100%] m-auto"
                              options={regions[selectedRightRegion]}
                              placeholder="Select a country"
                              onChange={handleRightCountryChange}
                              isSearchable
                              getOptionLabel={(e) => (
                                <div className="flex items-center gap-2">
                                  <img src={e.flag} alt="" className="w-5 h-5" />
                                  {e.label}
                                </div>
                              )}
                            />
                            {selectedRightCountry && (
                              <Select
                                className="rounded-full w-[100%]  mt-5"
                                options={rightPorts}
                                placeholder="Select a port"
                                isSearchable
                              />
                            )}
                            <button
                              onClick={handleSearchRight}
                              className="bg-[#d1a460] hover:bg-[#d39c4a] text-white rounded-full py-3 w-[100%] m-auto mt-2"
                            >
                              Search
                            </button>
                            <button
                              className="capsule-3d border border-white rounded-full py-3 w-[100%] m-auto mt-2"
                              onClick={handleRightBack}
                            >
                              <i className="fa-solid fa-arrow-left fa-beat me-2"></i>{" "}
                              Back to Regions
                            </button>
                          </>
                        )}
                </>):(
                   // Render Region Options
                   Object.keys(regions).map((region) => (
                    <button
                      key={region}
                      className="capsule-3d border border-white rounded-full py-3 w-[100%] m-auto"
                      onClick={() => handleRightRegionClick(region)}
                    >
                      {region}
                    </button>
                  ))

                )}
                
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Go to Top Button */}
        {isScrolled && (
          <div
            className="fixed bottom-16 right-8 z-50" // Ensure it's in the right position with high z-index
          >
            <div
              className="back-to-top px-4 hover:bg-[#615d91]"
              onClick={scrollToTop}
            >
              <i className="fa-solid fa-arrow-up text-2xl"></i>
            </div>
          </div>
        )}

        {/* Go to Top Button */}
        {isScrolled && (
          <div
            className="fixed bottom-16 right-8 z-50 " // Ensure it's in the right position with high z-index
          >
            <div
              className="back-to-top px-4 hover:bg-[#615d91]"
              onClick={scrollToTop}
            >
              <i className="fa-solid fa-arrow-up text-2xl"></i>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
