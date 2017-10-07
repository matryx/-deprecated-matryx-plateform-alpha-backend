--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Submission; Type: TABLE; Schema: public; Owner: leo
--

CREATE TABLE "Submission" (
    id integer NOT NULL,
    title character varying(512) NOT NULL,
    "desc" text NOT NULL,
    "User_id" bigint NOT NULL,
    created_time timestamp with time zone DEFAULT now() NOT NULL,
    updated_time timestamp with time zone DEFAULT now() NOT NULL,
    data text NOT NULL
);


ALTER TABLE "Submission" OWNER TO leo;

--
-- Name: Submission_id_seq; Type: SEQUENCE; Schema: public; Owner: leo
--

CREATE SEQUENCE "Submission_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Submission_id_seq" OWNER TO leo;

--
-- Name: Submission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: leo
--

ALTER SEQUENCE "Submission_id_seq" OWNED BY "Submission".id;


--
-- Name: Token; Type: TABLE; Schema: public; Owner: leo
--

CREATE TABLE "Token" (
    id integer NOT NULL,
    "User_id" bigint NOT NULL,
    value character varying(512) NOT NULL,
    created_time timestamp with time zone DEFAULT now() NOT NULL,
    expire_time timestamp with time zone NOT NULL,
    ip character varying(512) NOT NULL,
    agent character varying(2024) NOT NULL
);


ALTER TABLE "Token" OWNER TO leo;

--
-- Name: Token_id_seq; Type: SEQUENCE; Schema: public; Owner: leo
--

CREATE SEQUENCE "Token_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Token_id_seq" OWNER TO leo;

--
-- Name: Token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: leo
--

ALTER SEQUENCE "Token_id_seq" OWNED BY "Token".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: leo
--

CREATE TABLE "User" (
    id integer NOT NULL,
    public_key character varying(1024) NOT NULL,
    created_time timestamp with time zone DEFAULT now() NOT NULL,
    updated_time timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE "User" OWNER TO leo;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: leo
--

CREATE SEQUENCE "User_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "User_id_seq" OWNER TO leo;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: leo
--

ALTER SEQUENCE "User_id_seq" OWNED BY "User".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: leo
--

ALTER TABLE ONLY "Submission" ALTER COLUMN id SET DEFAULT nextval('"Submission_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: leo
--

ALTER TABLE ONLY "Token" ALTER COLUMN id SET DEFAULT nextval('"Token_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: leo
--

ALTER TABLE ONLY "User" ALTER COLUMN id SET DEFAULT nextval('"User_id_seq"'::regclass);


--
-- Name: Submission_pkey; Type: CONSTRAINT; Schema: public; Owner: leo
--

ALTER TABLE ONLY "Submission"
    ADD CONSTRAINT "Submission_pkey" PRIMARY KEY (id);


--
-- Name: Token_pkey; Type: CONSTRAINT; Schema: public; Owner: leo
--

ALTER TABLE ONLY "Token"
    ADD CONSTRAINT "Token_pkey" PRIMARY KEY (id);


--
-- Name: User_pkey; Type: CONSTRAINT; Schema: public; Owner: leo
--

ALTER TABLE ONLY "User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

