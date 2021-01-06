import React, { Component } from 'react'
import CreatePostData from '../../../../components/Admin/Post/CreatePostData';
import NavBar from '../../../../components/Admin/Appbar/NavBar';

import Admin from '../../../../components/Admin/Admin'

/**
 * 
 *
import { useState, useEffect } from 'react'
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { withRouter } from "next/router";
import '../../../../node_modules/react-quill/dist/quill.snow.css'
import { QuillFormats, QuillModules } from '../../../../helpers/quill';
import TextField from '@material-ui/core/TextField';
import { uploadImage } from '../../../../actions/admin/posts';
 */

export default function CreatePost() {


 return (
  <React.Fragment>
  <Admin>
    <NavBar />
    <CreatePostData />
  </Admin>
  </React.Fragment>
 )
}
