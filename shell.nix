let
  defaultPkgs = import <nixpkgs> {};
  pinnedPkgs = import (defaultPkgs.fetchFromGitHub {
    owner = "NixOS";
    repo = "nixpkgs-channels";
    rev = "f0fac3b578086066b47360de17618448d066b30e"; # 17 April 2017
    sha256 = "1mpwdminwk1wzycwmgi2c2kwpbcfjwmxiakn7bmvvsaxb30gwyyb";
  }) {};

in

{ nixpkgs ? pinnedPkgs }:

let
  pkgs = if nixpkgs == null then defaultPkgs else pinnedPkgs;
  devEnv = with pkgs; buildEnv {
    name = "devEnv";
    paths = [
      awscli
      chromium
      nodejs-6_x
      xvfb_run
    ];
  };
in
  pkgs.runCommand "setupEnv" {
    buildInputs = [
      devEnv
    ];
    shellHook = ''
      export PATH=./node_modules/.bin:$PATH
      export CHROME_BIN=chromium
    '';
  } ""
