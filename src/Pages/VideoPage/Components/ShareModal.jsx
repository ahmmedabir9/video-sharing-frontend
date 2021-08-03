import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const ShareModal = ({ showShare, setShowShare, video }) => {
  const onCopyText = () => {
    toast.success("Link Copied!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {video?.title}
                </h3>
                <h3
                  class="text-md leading-6 font-sm text-gray-600"
                  id="modal-title"
                >
                  Share on Social Media or Copy the Link
                </h3>
                <div class="overflow-hidden p-3">
                  <FacebookShareButton
                    url={window.location.href}
                    quote={`Watch The Latest Video from my Site`}
                    className="m-1"
                  >
                    <FacebookIcon size={35} round={true}></FacebookIcon>
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={window.location.href}
                    quote={`Watch The Latest Video from my Site`}
                    className="m-1"
                  >
                    <WhatsappIcon size={35} round={true}></WhatsappIcon>
                  </WhatsappShareButton>
                  <EmailShareButton
                    url={window.location.href}
                    quote={`Watch The Latest Video from my Site`}
                    className="m-1"
                  >
                    <EmailIcon size={35} round={true}></EmailIcon>
                  </EmailShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    quote={`Watch The Latest Video from my Site`}
                    className="m-1"
                  >
                    <TwitterIcon size={35} round={true}></TwitterIcon>
                  </TwitterShareButton>
                </div>
                <div class="rounded-xl overflow-hidden bg-gray-800 p-3">
                  <code class="text-gray-50">{window.location.href}</code>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <CopyToClipboard text={window.location.href} onCopy={onCopyText}>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Copy Link
              </button>
            </CopyToClipboard>
            <button
              onClick={() => setShowShare(false)}
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
